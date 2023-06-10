import {Component} from 'react';

class Practice extends Component{

    constructor(props){
        super(props)
        
    }

    state = {
        name: "Karthi",
        age: 10,
    }


    changeName=()=>{

        this.setState({name: "Shiyaam"})
    }

    render(){
        return (
            <>
            <h1 >Hello {this.state.name}</h1>
            <button onClick={this.changeName}>Click</button>
            </>
        )
    }
}

export default Practice;