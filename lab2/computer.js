function display()
{
    let arr= [
        ["Monitors", "LCD Screens", "LED Screens", "Vibrant Colors"],
        ["Motherboards", "Fast"],
        ["Chips", "i9", "i7", "i5", "i3", "Core2Duo", "Pentium", "Very Fast"],
        ["Hard Drives", "2TB", "1TB", "100-500 GB", "Fast Reading"],
        ["DVD-ROMs", "Burn CDs", "Burn DVDs"],
        ["Cases", "ATX", "AT", "Mini", "Other Sizes", "Choice of Colors"],
        ["Power Supplies", "we can get one for any computer!"]
    ]

    let s="";
    for(let i=0;i<arr.length;i++)
    {
        let s2="";
        s2= "<span class=\"item\">" + arr[i][0]+" : ";
        for(let j=1;j<arr[i].length;j++)
        {
            s2=s2+ arr[i][j]+" ,";
        }
        s=s+s2.substring(0,s2.length-1)+"</span><br>"
    }
   // alert(s);
    document.getElementById("div1").hidden=false;
    document.getElementById("div1").innerHTML=s;
}
