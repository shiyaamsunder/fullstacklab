##Run this file with the below command
# powershell -ExecutionPolicy Bypass -File .\Install.ps1

## Check if the script is already running with administrative privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# If not running as admin, re-launch the script with elevated privileges
if ( -not $isAdmin) {
    # Build the new process start info
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = 'powershell.exe'
    $psi.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    $psi.Verb = 'RunAs'

    # Start the new process
    [System.Diagnostics.Process]::Start($psi) | Out-Null

    # Exit the current (non-elevated) script
    Exit
}

## Manifest
$manifest = @"
{
    "hadoop": {
        "version": "3.3.1",
        "name": "hadoop-*.tar.gz",
        "url": "https://dlcdn.apache.org/hadoop/common/hadoop-*/hadoop-*.tar.gz",
        "sha512": "2fd0bf74852c797dc864f373ec82ffaa1e98706b309b30d1effa91ac399b477e1accc1ee74d4ccbb1db7da1c5c541b72e4a834f131a99f2814b030fbd043df66"
    },
    "winutils": {
        "url": "https://github.com/kontext-tech/winutils/archive/master.zip"
    },
    "jdk": {
        "version": "1.8.0_361",
        "fileVersion": "8u361",
        "name": "jdk-*-windows-x64.exe",
        "url": "https://javadl.oracle.com/webapps/download/GetFile/1.8.0_361-b09/0ae14417abb444ebb02b9815e2103550/windows-i586/jdk-8u361-windows-x64.exe#license-lightbox"
    }
}
"@
$manifest = $manifest | ConvertFrom-Json

## Hadoop
$version = $manifest.hadoop.version
$name = $manifest.hadoop.name.Replace("*", $version)
$url = $manifest.hadoop.url.Replace("*", $version)
$sha512 = $manifest.hadoop.sha512

# Check if the file exists in the current directory
$filePath = (Get-Location).Path + "\" + $name
if (-not (Test-Path $filePath)) {
    Write-Output "Downloading $name from $url"
    Invoke-WebRequest -Uri $url -OutFile $filePath
}

# Checksum
Write-Host "Verifying checksum"
$hash = Get-FileHash $filePath -Algorithm SHA512
if ($hash.Hash -ne $sha512) {
    Write-Output "Checksum failed`nDelete $filePath and try again"
    Exit
}

# Try to create Hadoop Directory
$hadoopDir = "C:\Hadoop"
try {
    if (Test-Path $hadoopDir) {
        Write-Output "$hadoopDir already exists. Delete it and try again"
        Exit
    }
    else {
        New-Item -Path $hadoopDir -ItemType Directory -ErrorAction Stop | Out-Null
    }
}
catch {
    Write-Output "Failed to create $hadoopDir. Check permission and try again"
    Exit
}

# Extract Hadoop
Write-Output "Extracting $name to $hadoopDir"
tar -xf $filePath -C $hadoopDir #--strip-components=1
$hadoopDir = "$hadoopDir\hadoop-$version"

## Winutils
$url = $manifest.winutils.url

#Check if the file exists in the current directory
$filePath = (Get-Location).Path + "\winutils.zip"
if (-not (Test-Path $filePath)) {
    Write-Output "Downloading winutils from $url"
    Invoke-WebRequest -Uri $url -OutFile $filePath
}
Expand-Archive -Path $filePath

# Copy winutils to Hadoop bin directory
$winutilsDir = (Get-Location).Path + "\winutils\winutils-master\hadoop-$version\bin"
$hadoopBinDir = "$hadoopDir\bin"
Copy-Item -Path $winutilsDir\* -Destination $hadoopBinDir

## JDK
$version = $manifest.jdk.version
$fileVersion = $manifest.jdk.fileVersion
$name = $manifest.jdk.name.Replace("*", $fileversion)
$url = $manifest.jdk.url

# Check if the file exists in the current directory
$filePath = (Get-Location).Path + "\" + $name
if (-not (Test-Path $filePath)) {
    Write-Output "Downloading $name from $url"
    Invoke-WebRequest -Uri $url -OutFile $filePath
}

# Install JDK
$javaDir = "C:\Java\jdk$version"
if (Test-Path $javaDir) {
    Write-Output "$javaDir already exists. Delete it and try again"
    Exit
}
else {
    Write-Output "Installing $name"
    $arguments = "INSTALLDIR=$javaDir INSTALL_SILENT=Enable"
    Start-Process -FilePath $filePath -ArgumentList $arguments
}

## Set Environment Variables
$javaBinDir = "$javaDir\bin"
[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaDir, "Machine")
[Environment]::SetEnvironmentVariable("HADOOP_HOME", $hadoopDir, "Machine")
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$hadoopBinDir" + ";$javaBinDir", "Machine")
Write-Output "Environment variables set"

## Config files & directories

# Create directories
New-Item -Path "$hadoopDir\data\namenode", "$hadoopDir\data\datanode", "$hadoopDir\node\data\dfs\data", "$hadoopDir\node\data\dfs\namespace_logs" -ItemType Directory -ErrorAction Stop -Force | Out-Null

$configs = @(
    @{
        name    = "core-site.xml"
        content = @"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://0.0.0.0:19000</value>
    </property>
</configuration>
"@
    },
    @{
        name    = "hdfs-site.xml"
        content = @"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
   <property>
     <name>dfs.replication</name>
     <value>1</value>
   </property>
   <property>
     <name>dfs.namenode.name.dir</name>
     <value>file:///{0}/node/data/dfs/namespace_logs</value>
   </property>
   <property>
     <name>dfs.datanode.data.dir</name>
     <value>file:///{0}/node/data/dfs/data</value>
   </property>
</configuration>
"@ -f $hadoopDir.Replace("\", "/")
    },
    @{
        name    = "mapred-site.xml"
        content = @"
<?xml version="1.0"?>
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.application.classpath</name>
        <value>%HADOOP_HOME%/share/hadoop/mapreduce/*,%HADOOP_HOME%/share/hadoop/mapreduce/lib/*,%HADOOP_HOME%/share/hadoop/common/*,%HADOOP_HOME%/share/hadoop/common/lib/*,%HADOOP_HOME%/share/hadoop/yarn/*,%HADOOP_HOME%/share/hadoop/yarn/lib/*,%HADOOP_HOME%/share/hadoop/hdfs/*,%HADOOP_HOME%/share/hadoop/hdfs/lib/*</value>
    </property>
</configuration>
"@
    },
    @{
        name    = "yarn-site.xml"
        content = @"
<?xml version="1.0"?>
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
</configuration>
"@
    }
)

# Create config files
foreach ($config in $configs) {
    $configPath = "$hadoopDir\etc\hadoop\$($config.name)"
    $config.content | Out-File $configPath -Encoding UTF8
}
Write-Output "Config files updated"

Start-Process http://localhost:9870/dfshealth.html#tab-overview

## Manual steps
Write-Output "`nOpen a new terminal and run the following commands:`n"
Write-Output "hdfs namenode -format"
Write-Output "$hadoopDir\etc\hadoop\hadoop-env.cmd"
Write-Output "$hadoopDir\sbin\start-all.cmd`n"