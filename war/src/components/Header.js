import { NavLink } from "react-router-dom";
import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            darkMode: false
        }
    }

    toggle = () => {
        this.setState({ darkMode: !this.state.darkMode })

        if (document.body.className === 'light--theme') {
            document.body.classList.remove('light--theme')
            document.body.classList.add('dark--theme')
        } else {
            document.body.classList.add('light--theme')
            document.body.classList.remove('dark--theme')
        }
    }

    render() {
        return (

            <>
                <div className="flex align-center justify-space header">
                    <nav className="flex justify-space width-13">
                        <NavLink to={"/"}>Popular </NavLink>
                        <NavLink to={"/battle"}   >Battle </NavLink>
                    </nav>
                    {
                        this.state.darkMode ?
                            <p onClick={this.toggle} className='pointer darkmode-icon'> 💡 </p> :
                            <p onClick={this.toggle} className='pointer darkmode-icon'> 🔦</p>
                    }
                </div>
            </>

        )
    }
}

export default Header;
