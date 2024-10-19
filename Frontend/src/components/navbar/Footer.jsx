import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white flex justify-between items-center px-4 py-3">
      <div><h3 className="font-semibold text-xl">Blogify</h3></div>

      <div className="font-semibold sm:block hidden">@2024 Blogify • All Rights Reserved</div>

      <div className="flex items-center gap-2 text-xl">
        <FaGithub/>
        <FaLinkedinIn/>
        <FaTwitter/>
      </div>
    </footer>
  );
}

export default Footer;
