import React from 'react'
import {FaGithub, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa'
import {CiText} from 'react-icons/ci'
const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className="w-full flex flex-row h-20">
            <footer className="flex flex-row justify-between w-full px-6 bg-[#212121] text-white items-center">
                <div className="flex flex-row items-center">
                    <span className="text-base">&copy; {year} Bhaumik Chauhan</span>
                </div>

                <ul className="flex flex-row items-center">
                    <li className="mx-2"><a className="" target='_blank' href="https://www.instagram.com/bhaumik_chauhan_08/"><FaInstagram size={24}/></a></li>
                    <li className="mx-2"><a className="" target='_blank' href="https://www.linkedin.com/in/bhaumik-chauhan-415468257/"><FaLinkedin size={24}/></a></li>
                    <li className="mx-2"><a className="" target='_blank' href="https://github.com/bhaumik0307"><FaGithub size = {24}/></a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer
