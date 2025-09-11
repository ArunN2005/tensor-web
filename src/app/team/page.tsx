"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin, FaGithub, FaArrowLeft, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Simple pseudo-random number generator with seed (same as Hero component)
const seededRandom = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed) * 10000;
  const result = (x - Math.floor(x)) * (max - min) + min;
  return result;
};

// Generate particles for background
const generateParticles = (count: number, seed: number = 789) => {
  return Array.from({ length: count }, (_, i) => {
    const size = seededRandom(1, 3, seed + i * 0.1);
    const top = seededRandom(0, 100, seed + i * 0.2);
    const left = seededRandom(0, 100, seed + i * 0.3);
    const color = i % 3 === 0 
      ? 'hsla(var(--electric-cyan), 0.6)' 
      : i % 3 === 1 
        ? 'hsla(var(--digital-purple), 0.6)' 
        : 'hsla(var(--magenta), 0.6)';
        
    return { size, top, left, color, id: i };
  });
};

const members = [
	{
		name: "Premjith",
		designation: "Chairperson",
		year: "Faculty",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2PqB7bvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["staff"],
		socials: {
			instagram: "",
			linkedin: "",
			github: ""
		}
	},
	{
		name: "Pratiti Badhra",
		designation: "Chairperson",
		year: "Faculty",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2PqB7bvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["staff"],
		socials: {
			instagram: "",
			linkedin: "",
			github: ""
		}
	},
	{
		name: "Sajeev Senthil",
		designation: "President",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM0WoPxhq5GJsPEI3q4ioMFjNQWOfChd6etDpr",
		category: ["core"],
		socials: {
			instagram: "https://www.instagram.com/__sajeev__01?igsh=MTFpbDIwYzYyeXlh",
			linkedin: "https://www.linkedin.com/in/sajeev-senthil-35814a2b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/SajeevSenthil"
		}
	},
	{
		name: "Anirudh S Varrier",
		designation: "Vice-President",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMNHkaRYzjJFadQKc0ftS6TpLuZxeP23hHylmM", // old (not direct)
		//image: "/images/Anirudh Varrier.png", // direct public link for UploadThing
		category: ["core"],
		socials: {
			instagram: "https://www.instagram.com/ani.varrier/",
			linkedin: "https://www.linkedin.com/in/anirudh-s-varrier/",
			github: "https://github.com/Anirudh2465"
		}
	},
	{
		name: "Siva Prasath",
		designation: "Treasurer",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMbR2zNSYpTKvoWYSmf7eLsj9qrIE3FpGzxR2U",
		category: ["core"],
		socials: {
			instagram: "https://www.instagram.com/shivaprasanth_?igsh=MWRxZHBwNmF4MXky",
			linkedin: "https://www.linkedin.com/in/siva-prasanth-sivaraj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/SivaPrasanthSivaraj"
		}
	},
	{
		name: "Chanjhana Elango",
		designation: "Tech Head",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMe0MLka53zLGrZFsBCRU5avqSVPYi9EXmTtND",
		category: ["core"],
		socials: {
			instagram: "https://www.instagram.com/chanjhana_/?next=%2F",
			linkedin: "https://www.linkedin.com/in/chanjhana",
			github: "https://github.com/chanjhana"
		}
	},
	{	
		name: "Preetham Reddy",
		designation: "Research & Development Head",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["core", "research"],
		socials: {
			instagram: "",
			linkedin: "",
			github: ""
		}
	},
	{
		name: "Keerthivasan S V",
		designation: "Web Dev Lead",
		year: "3rd Year AIE",
		image: "https://media.licdn.com/dms/image/v2/D5603AQF1bBmX3MQhEw/profile-displayphoto-scale_400_400/B56ZiUlBrfHUAk-/0/1754839392810?e=1759968000&v=beta&t=u95GxjVUvkddYTQcd4kI4wiXBAHu0SsHNJhmVJfrO2Y",
		category: ["core", "webdev"],
		socials: {
			instagram: "https://www.instagram.com/keerrrthiv/",
			linkedin: "https://www.linkedin.com/in/keerthivasansv/",
			github: "https://github.com/Keerthivasan-Venkitajalam"
		}
	},
	{
		name: "Vishal Suresh",
		designation: "PR Head",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMshAFmiX2cxBQVKDz1tHj6WAd8NoZJhmfYGLu",
		category: ["core", "pr"],
		socials: {
			instagram: "https://www.instagram.com/vishnstad?igsh=MWIzM3E5NTJ6cWpnNQ==",
			linkedin: "https://www.linkedin.com/in/vishal-suresh-udmdt?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/vishnstad"
		}
	},
	{
		name: "Aslesh Ravipati",
		designation: "Media Head",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM7JLlYurndVSMHTNztFDgKXOshUrf5CGl3Wke",
		category: ["core", "media"],
		socials: {
			instagram: "https://www.instagram.com/itsme_aslesh?igsh=eWFsZ2FkZzMzNXg1&utm_source=qr",
			linkedin: "",
			github: "https://github.com/aslesh05"
		}
	},
	{
		name: "Guhan Balachandran",
		designation: "Logistics Head",
		year: "3rd Year Civil",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMMwiwPI3OoqBJ7HnQi8hRFWdE3pyCI1fNxcAs",
		category: ["core", "logistics"],
		socials: {
			instagram: "https://instagram.com/janesmith",
			linkedin: "https://linkedin.com/in/janesmith",
			github: "https://github.com/janesmith"
		}
	},
	{
		name: "Ajaybhargava Jashwanthreddy",
		designation: "R & D Core",
		year: "3rd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMy8mRO3fbQM4HBlK02IcCwRS6joqhgE9DFOtz",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/jashwan_95/",
			linkedin: "https://www.linkedin.com/in/ajeyabhargava-jashwanth-reddy-aa1a57270",
			github: "https://github.com/Ajey95"
		}
	},
	{
		name: "Rithvik Rajesh",
		designation: "R & D core",
		year: "3rd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMHCsR8JVJFIjyBYoWU9CLRc6f8XDTqt5hKxgn",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/rithvik_rajesh_04/",
			linkedin: "https://www.linkedin.com/in/rithvik-rajesh-99893721b/",
			github: "https://github.com/Rithvik-Rajesh"
		}
	},
	{
		name: "Yashwanth P T",
		designation: "R & D core",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMgyUr2jbu7L5kgxMzcNX9ZHPEyTF2fBn8I3qJ",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/arulyashwanth/profilecard/?igsh=dnJuOTYweXpiZDd4",
			linkedin: "https://www.linkedin.com/in/yashwanth-p-t-022976334",
			github: "https://github.com/arulyashwanth"
		}
	},
	{
		name: "Aadhithya Bharathi",
		designation: "PR",
		year: "3rd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMWAtIUErDYvnbHLayjQmpoU2q79RctzhKkZWE",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/aadhithya_10?igsh=MTBpZjZ6d3Yxbjc4cg==",
			linkedin: "https://www.linkedin.com/in/aadhithya-bharathi-86a9aa290/",
			github: "https://github.com/Aadhithya10"
		}
	},
	{
		name: "Hariharan Bhaskaran",
		designation: "R & D Core",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "",
			linkedin: "https://www.linkedin.com/in/hariharanbhaskaran28",
			github: "https://github.com/haribhaski"
		}
	},
	{
		name: "Shreya Sriram",
		designation: "Logistics",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMb8cmTmpTKvoWYSmf7eLsj9qrIE3FpGzxR2UP",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/shreya_sriram05?igsh=YzUxZ3RkOGttNTV1",
			linkedin: "https://www.linkedin.com/in/shreya-sriram-7b20882b7/",
			github: "https://github.com/Shreya12125"
		}
	},
	{
		name: "Krish S",
		designation: "R & D Volunteer",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMYPv42eOUbaGEsxum4vNRe6OPHzqDjW9pIMhg",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/krishs_2005?igsh=MWpuNHRiOTB0cGc0eA==",
			linkedin: "https://www.linkedin.com/in/krish-s-714602301/",
			github: "https://github.com/krish-subramoniam"
		}
	},
	{
		name: "Akshaya Vasudevan",
		designation: "Logistics",
		year: "3rd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMrAfWjZgkgczFm6ueh2fQNExLAtRy0bSKs195",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/_ak_hxyx_02/profilecard/?igsh=MTUyaXl5anVqNHNpYw==",
			linkedin: "https://www.linkedin.com/in/akshaya-vasudevan-002131292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/Akshaya-Vasudevan"
		}
	},
	{
		name: "Suriya Narayan S",
		designation: "Logistics",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMmyp1q6n4S51OUfMy2PKXp3bqz0iBAa8DstZW",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/blu_hawk79?igsh=MWFiaGVhcGllYW9vZw==",
			linkedin: "https://www.linkedin.com/in/surya-narayan-s-749814322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/Sur-NS78"
		}
	},
	{
		name: "Karishini S",
		designation: "R & D Core",
		year: "3rd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMdFKQJ0eYRiSNspvuaH2qBCV13fobWQXcO4nk",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/karishini_2006?igsh=NTgwN21mMnV5em11",
			linkedin: "https://www.linkedin.com/in/karishini-surendrakumar-b08b74292",
			github: "https://github.com/Karishini-S"
		}
	},
	{
		name: "P U Hygrevan",
		designation: "Logistics",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMBuzLBWPZs01IRiOowJljZm85KAaQS4rLpPqH",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/hygrevan_343_?igsh=MXU2dTA3eXRjeXY5bA==",
			linkedin: "",
			github: "https://github.com/Hygrevan-343"
		}
	},
	{
		name: "Sadhana T P",
		designation: "R & D Volunteer",
		year: "3rd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMCsk4FhmRXaTFje65KP39OBnstUhYvLSpcMVE",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/_sadhu.14?igsh=MTY3Y3oxMHlsMnM2Yw==",
			linkedin: "https://www.linkedin.com/in/sadhana-t-p-05756234a/",
			github: "https://github.com/sadhanatp14"
		}
	},
	{
		name: "Ashwin K",
		designation: "Web Dev",
		year: "3rd Year CYS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMuN1fXCVsFk6wmhzrGDfJVgMpxyYN9KHQCWiu",
		category: ["webdev"],
		socials: {
			instagram: "https://www.instagram.com/ashey._.7?igsh=MWU5cHl2YTVnNG44ZA==",
			linkedin: "https://www.linkedin.com/in/ashwin-k-243701288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/Ashwin-1411"
		}
	},
	{
		name: "Sudharsana Saravanan S",
		designation: "Web Dev",
		year: "3rd Year CSE",
		image: "https://image2url.com/images/1757351266918-4241e98e-cc88-4820-8070-6b6ccae4e50f.png",
		category: ["webdev"],
		socials: {
			instagram: "https://www.instagram.com/_.sudharsan___",
			linkedin: "https://www.linkedin.com/in/sudharsana-saravanan-s-456544299/",
			github: "https://github.com/SudharsanSaravanan"
		}
	},
	{
		name: "Swetha C",
		designation: "Web Dev",
		year: "3rd Year CSE",
		image: "https://image2url.com/images/1757352114289-3aa28b33-d4e1-41dc-aeab-a623b8a8aa9d.jpeg",
		category: ["webdev"],
		socials: {
			linkedin: "https://www.linkedin.com/in/swetha-c-011099293/",
			github: "https://github.com/SWETHACS17"
		}
	},
	{
		name: "Sri Krishna V",
		designation: "R & D Core",
		year: "3rd Year EEE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMamEKsqPmVDgpnIfoisbjMe0z3KcLTu1GkO9B",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/_.anhxirk_/",
			linkedin: "https://www.linkedin.com/in/sri-krishna-vundavalli/",
			github: "https://github.com/Sri-Krishna-V"
		}
	},
	{
		name: "Pooja Shree S",
		designation: "R & D Core",
		year: "3rd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMBAokgfZs01IRiOowJljZm85KAaQS4rLpPqHG",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/pooja.shree._._/profilecard/?igsh=bWVzM2x2bHJid2Y4",
			linkedin: "https://www.linkedin.com/in/poojashreesen/",
			github: "https://github.com/Pooja29Shree"
		}
	},
	{
		name: "Yash Bardia",
		designation: "R & D Core",
		year: "3rd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/yendelevium/",
			linkedin: "https://www.linkedin.com/in/yashbardia/",
			github: "https://github.com/yendelevium"
		}
	},
	{
		name: "Gowri J S",
		designation: "Logistics",
		year: "3rd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMn15afliVUjEuP2D7C48FQxpyiIYNkvS3AdBO",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/_mii.nnuuu.__?igsh=MW9qZTFsNTF2b2M1cA==	",
			linkedin: "",
			github: "https://github.com/gowri-js"
		}
	},
	{
		name: "Aditya Santosh",
		designation: "Logistics",
		year: "3rd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMKZqJD8YAiXbx2MIO1fvsk7hprYKeLSZNCTto",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/adityasantosh__07?igsh=b2l6bzQ1NzhxdHIy",
			linkedin: "https://www.linkedin.com/in/aditya-santosh-596377311",
			github: "https://github.com/ADI040309"
		}
	},
	{
		name: "Jeevakamal K R",
		designation: "PR",
		year: "3rd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMVPlqH8B5EFZr3IcNJBPpm0LOx8vokyQGaRbA",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/__j_e_e_v_a_07__?igsh=MWxlbXlrbmhkdDd1YQ==",
			linkedin: "https://www.linkedin.com/in/jeevakamal-k-r-248435280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/kamaladhi"
		}
	},
	{
		name: "Jishnu Teja Dandamudi",
		designation: "R & D Volunteer",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMgmJtMMbu7L5kgxMzcNX9ZHPEyTF2fBn8I3qJ",
		category: ["research-vounteer"],
		socials: {
			instagram: "https://www.instagram.com/d_jishnu_teja?igsh=MXNpbnlhbHpzcWVibw==",
			linkedin: "https://www.linkedin.com/in/jishnu-teja-dandamudi-858028289",
			github: "https://github.com/cscprojishnu"
		}
	},
	{
		name: "Nihilmukkesh S H",
		designation: "R & D Volunteer",
		year: "2nd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/sh.nihil.mukkesh?igsh=MWl3eW1qdjluazI4aQ%3D%3D&utm_source=qr",
			linkedin: "https://www.linkedin.com/in/sh-nihil-mukkesh/",
			github: "https://github.com/SH-Nihil-Mukkesh-25"
		}
	},
	{
		name: "Narendra R",
		designation: "Logistics",
		year: "2nd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMELCddJtEXsxpYJ2dvCkbH0K1ga9WnLmijGZz",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/naren_offcl_07?igsh=cWFoaXh5ZG5vc2w2",
			linkedin: "https://www.linkedin.com/in/narendra-r-3b7625335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/narendrar-133"
		}
	},
	{
		name: "Nithin Venkat Sharma",
		designation: "Web Dev",
		year: "2nd Year CSE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMVoafvJB5EFZr3IcNJBPpm0LOx8vokyQGaRbA",
		category: ["webdev"],
		socials: {
			instagram: "https://www.instagram.com/nithin_pm_006?igsh=Zm83bmx6bWRpbXRu",
			linkedin: "",
			github: "https://github.com/Nithin0306"
		}
	},
	{
		name: "Vishal Krishnaa",
		designation: "R & D Volunteer",
		year: "2nd Year ARE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMG8bftS0WJl6rSDyaONuojcQV30ZeE8Tvqpwg",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/__vk23___?igsh=Y2IybjloNHp0YXVh",
			linkedin: "https://www.linkedin.com/in/vishalkrishnaar",
			github: "https://github.com/VK-geek"
		}
	},
	{
		name: "Meera S Raj",
		designation: "PR",
		year: "2nd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMRfJiiD2uHinAFhtLekMXZ8VQ0BwWSPD2cqsE",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/_sadhu.14?igsh=MTY3Y3oxMHlsMnM2Yw==",
			linkedin: "",
			github: "https://github.com/MeeraSRaj"
		}
	},
	{
		name: "Theerth Krish",
		designation: "PR",
		year: "3rd Year AIE",
		image: "",
		category: ["pr"],
		socials: {
			instagram: "",
			linkedin: "https://www.linkedin.com/in/theerth-krish",
			github: "https://github.com/TheerthK"
		}
	},
	{
		name: "Prajit B",
		designation: "R & D Volunteer",
		year: "2nd Year CCE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMRxxsHW12uHinAFhtLekMXZ8VQ0BwWSPD2cqs",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/_.prxjit._/",
			linkedin: "https://www.linkedin.com/in/prajitb/",
			github: "https://github.com/Prajit-B"
		}
	},
	{
		name: "Jothsna Kishore",
		designation: "Logistics",
		year: "2nd Year CCE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM9dn35xQS7LBvKtcRgPrlWN3j65UdpzToqwkM",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/jothsna06?igsh=dmQ1eDBtd3Nrbnp0",
			linkedin: "https://www.linkedin.com/in/jothsna-kishore-50b0ab326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: ""
		}
	},
	{
		name: "G Sashank Sai",
		designation: "Logistics",
		year: "2nd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMOSKqxV9C5z9mK43RujEXL1fYlVZryiMAdHUw",
		category: ["logistics"],
		socials: {
			instagram: "https://www.instagram.com/sashank_20061?igsh=b3Rrc2Uzc2lrOTJs&utm_source=qr",
			linkedin: "",
			github: "https://github.com/saas29"
		}
	},
	{
		name: "Jaswanth Saravanan",
		designation: "R & D Volunteer",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMgOa2z9bu7L5kgxMzcNX9ZHPEyTF2fBn8I3qJ",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/jasss__pvt/",
			linkedin: "",
			github: "https://github.com/Jaswanth-006"
		}
	},
	{
		name: "Rithan S",
		designation: "R & D Volunteer",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/rithan_inxi/",
			linkedin: "",
			github: "https://github.com/RITHAN-SIVASAMY"
		}
	},
	{
		name: "MahaKisore M",
		designation: "R & D Volunteer",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/maha_kisore/?hl=en",
			linkedin: "https://www.linkedin.com/in/mahakisore-m-830863280/",
			github: "https://github.com/Mahakisore7"
		}
	},
	{
		name: "Sri Harini M P",
		designation: "PR",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMFcOrUs4yMb63oTY8p2vWkKErBwxmfXRql1Ug",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/sriharini_._?igsh=N2dsazd2dnV6bnQ0",
			linkedin: "",
			github: "https://github.com/sriharini-06"
		}
	},
	{
		name: "K Kirthivaasan",
		designation: "R & D Volunteer",
		year: "2nd Year MECH",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMvn8TGcxwnSBKq8Xs347AdkJQuyxZNrC5MfhY",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/kirthivaasan__/",
			linkedin: "https://www.linkedin.com/in/kirthivaasan-k-9a9580346/",
			github: "https://github.com/Kirthivaasan15"
		}
	},
	{
		name: "Arnita N",
		designation: "R & D Volunteer",
		year: "2nd Year AIDSM",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM2WdplVvarxBmlstRjKeL8qIwWV3kUZ2CJHpS",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/arnita_n_5?igsh=ZDA4bHBkdWN5b2Yw&utm_source=qr",
			linkedin: "https://www.linkedin.com/in/arnita",
			github: "https://github.com/Arnita5"
		}
	},
	{
		name: "Nirmal Ramamoorthy",
		designation: "R & D Volunteer",
		year: "2nd Year AIDS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMbBBEOfpTKvoWYSmf7eLsj9qrIE3FpGzxR2UP",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/exactlynirmal?igsh=MTU5MjFlem96bTk5Yg==",
			linkedin: "https://www.linkedin.com/in/nirmal-ramamoorthy-954729307",
			github: "https://github.com/nirmal-a-r"
		}
	},
	{
		name: "Naga Shiva D",
		designation: "R & D Volunteer",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMv34Kk6hxwnSBKq8Xs347AdkJQuyxZNrC5Mfh",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/naga_shiva_23",
			linkedin: "",
			github: "https://github.com/NAGA-SHIVA"
		}
	},
	{
		name: "Ram Viyaas S",
		designation: "R & D Volunteer",
		year: "2nd Year ARE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM32FQ4ESzNlPv8ETgVFhru6YpfKDysXj4JqoG",
		category: ["research"],
		socials: {
			instagram: "https://www.instagram.com/ram.viyaas?igsh=NHE0NDY2eDV4ZW92",
			linkedin: "https://www.linkedin.com/in/ram-viyaas-07507a332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/AYRAbotics"
		}
	},
	{
		name: "Ardhra Vinod",
		designation: "PR",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSM0nbDnuq5GJsPEI3q4ioMFjNQWOfChd6etDpr",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/ardhr_a464?igsh=MWR1eGl0M2drb3czZw==",
			linkedin: "https://www.linkedin.com/in/ardhravinod",
			github: "https://github.com/Ardhra5"
		}
	},
	{
		name: "A Ridhusree",
		designation: "Social Media",
		year: "2nd Year CYS",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMb1QbHXpTKvoWYSmf7eLsj9qrIE3FpGzxR2UP",
		category: ["media"],
		socials: {
			instagram: "https://www.instagram.com/ridhusreee/",
			linkedin: "https://www.linkedin.com/in/a-ridhusree-063303369",
			github: "https://github.com/Ridhu737"
		}
	},
	{
		name: "Meera S",
		designation: "Logistics",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMRBajCl2uHinAFhtLekMXZ8VQ0BwWSPD2cqsE",
		category: ["media"],
		socials: {
			instagram: "https://www.instagram.com/meera.sathyajith?igsh=bTdlOHJzNWZrZGFi",
			linkedin: "https://www.linkedin.com/in/meera-s-81949b303/",
			github: "https://github.com/MeeraSathyajith"
		}
	},
	{
		name: "Samridhy Remesh",
		designation: "PR",
		year: "2nd Year MECH",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMmsLhxqn4S51OUfMy2PKXp3bqz0iBAa8DstZW",
		category: ["pr"],
		socials: {
			instagram: "",
			linkedin: "",
			github: ""
		}
	},
	{
		name: "V Koushik",
		designation: "PR",
		year: "2nd Year AIE",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMdCiJRVyeYRiSNspvuaH2qBCV13fobWQXcO4n",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/lord_koushik_001/",
			linkedin: "www.linkedin.com/in/koushik-venkatesan-7b79a8259",
			github: "https://github.com/lord-koushik-001"
		}
	},
	{
		name: "Sailesh M",
		designation: "PR",
		year: "2nd Year MECH",
		image: "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMe0KkWL53zLGrZFsBCRU5avqSVPYi9EXmTtND",
		category: ["pr"],
		socials: {
			instagram: "https://www.instagram.com/assavageasstoic/",
			linkedin: "https://www.linkedin.com/in/sailesh-m-449899318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
			github: "https://github.com/sailesh78910"
		}
	},

];

const categories = [
	{ key: "all", label: "All Members" },
	{ key: "staff", label: "Staff Coordinators" },
	{ key: "core", label: "Core" },
	{ key: "webdev", label: "Web Dev" },
	{ key: "pr", label: "PR" },
	{ key: "research", label: "R&D" },
	{ key: "media", label: "Media" },
	{ key: "logistics", label: "Logistics" },
];

export default function TeamPage() {
	const [filter, setFilter] = useState("all");
	const [isMobile, setIsMobile] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [particles, setParticles] = useState<Array<{size: number, top: number, left: number, color: string, id: number}>>([]);
	
	// CSS for gradient animation
	useEffect(() => {
		// Add the keyframes animation if it doesn't exist
		if (!document.querySelector('#gradient-animation-style')) {
			const styleElement = document.createElement('style');
			styleElement.id = 'gradient-animation-style';
			styleElement.textContent = `
				@keyframes gradient-shift {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`;
			document.head.appendChild(styleElement);
		}
	}, []);

	// Ensure only one button is visible in mobile view, even on reload
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Generate particles on client-side
	useEffect(() => {
		setIsLoaded(true);
		setParticles(generateParticles(25));
	}, []);

	const filteredMembers =
		filter === "all"
			? members
			: members.filter((member) => member.category.includes(filter));

	// Heading animation on mount
	useEffect(() => {
		gsap.fromTo(
			headingRef.current,
			{ opacity: 0, y: -40 },
			{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
		);

		// Add subtle floating animation to particles
		setTimeout(() => {
			const particleElements = document.querySelectorAll('.team-particle');
			particleElements.forEach((particle, i) => {
				const delay = i * 0.05;
				gsap.fromTo(
					particle,
					{ 
						opacity: 0,
						y: seededRandom(-10, 10, 456 + i),
						x: seededRandom(-10, 10, 789 + i)
					},
					{ 
						opacity: 0.7,
						y: 0,
						x: 0,
						duration: 1.5,
						delay: delay,
						ease: "power2.out"
					}
				);
				
				// Add continuous floating movement
				gsap.to(particle, {
					y: `+=${seededRandom(-15, 15, 101 + i)}`,
					x: `+=${seededRandom(-15, 15, 202 + i)}`,
					duration: 3 + seededRandom(0, 5, 303 + i),
					delay: delay,
					ease: "sine.inOut",
					repeat: -1,
					yoyo: true
				});
			});
		}, 100);
	}, []);

	// Smooth card animations on scroll (desktop only)
	useEffect(() => {
		if (!isMobile && containerRef.current) {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			gsap.set(".team-card", { opacity: 0, y: 40, transform: "translateZ(0)" });
			ScrollTrigger.batch(".team-card", {
				start: "top 85%",
				onEnter: (batch) => {
					gsap.to(batch, {
						opacity: 1,
						y: 0,
						stagger: 0.15,
						duration: 0.8,
						ease: "power3.out"
					});
				},
				onLeaveBack: (batch) => {
					gsap.to(batch, {
						opacity: 0,
						y: 40,
						duration: 0.5,
						ease: "power2.inOut"
					});
				}
			});
		}
	}, [filteredMembers, isMobile]);

	// Reset card index when filter changes
	useEffect(() => {
		return setCardIndex(0);
	}, [filter]);

	// Mobile: handle section switching (now works for all sections)
	const currentCategoryIndex = categories.findIndex(cat => cat.key === filter);
	const handlePrevSection = () => {
		const newIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
		setFilter(categories[newIndex].key);
		
		// Add a small animation effect for feedback
		if (isMobile) {
			gsap.to(".mobile-category-indicator", {
				x: -10, 
				duration: 0.2,
				onComplete: () => {
					gsap.to(".mobile-category-indicator", {
						x: 0,
						duration: 0.3,
						ease: "back.out"
					});
				}
			});
		}
	};
	
	const handleNextSection = () => {
		const newIndex = (currentCategoryIndex + 1) % categories.length;
		setFilter(categories[newIndex].key);
		
		// Add a small animation effect for feedback
		if (isMobile) {
			gsap.to(".mobile-category-indicator", {
				x: 10, 
				duration: 0.2,
				onComplete: () => {
					gsap.to(".mobile-category-indicator", {
						x: 0,
						duration: 0.3,
						ease: "back.out"
					});
				}
			});
		}
	};

	const handlePrev = () => {
		setCardIndex((prev) => (prev === 0 ? filteredMembers.length - 1 : prev - 1));
	};
	const handleNext = () => {
		setCardIndex((prev) => (prev === filteredMembers.length - 1 ? 0 : prev + 1));
	};

	// Dynamically calculate social icons top position based on name height
	const getSocialIconsTop = (index: number) => {
		const nameEl = nameRefs.current[index];
		if (nameEl) {
			const height = nameEl.offsetHeight;
			return `${height + 44}px`; // 44px for spacing below name+designation+year
		}
		return "80px";
	};

	return (
		<div className="min-h-screen bg-[hsl(var(--background))] text-white py-16 px-6 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 z-0">
				{/* Gradient orbs */}
				<div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
				<div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[100px]"></div>
				<div className="absolute top-3/4 left-3/4 w-[20vw] h-[20vw] rounded-full bg-[hsla(var(--magenta),0.05)] blur-[80px]"></div>
				
				{/* Subtle grid pattern overlay */}
				<div className="absolute inset-0 opacity-5 pointer-events-none">
					<div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
				</div>
			</div>
			
			{/* Particles animation - only rendered on client side */}
			{isLoaded && particles.map(particle => (
				<div 
					key={particle.id} 
					className="team-particle absolute rounded-full z-1 opacity-0"
					style={{ 
						width: `${particle.size}px`, 
						height: `${particle.size}px`, 
						top: `${particle.top}%`, 
						left: `${particle.left}%`,
						backgroundColor: particle.color,
						boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
					}}
				></div>
			))}

			<h1
				ref={headingRef}
				className="text-4xl md:text-5xl font-bold text-center mb-4 relative z-10"
				style={{ fontFamily: 'var(--font-unbounded)' }}
			>
				<span className="text-white">Meet Our</span>{' '}
				<span className="gradient-text relative inline-block">
					Team
					<span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.7)] to-[hsla(var(--magenta),0.7)]"></span>
				</span>
			</h1>
			
			<p className="text-lg text-center text-[hsl(var(--foreground))] opacity-80 max-w-2xl mx-auto mb-12 relative z-10" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
				The brilliant minds behind <span className="text-[hsla(var(--electric-cyan),1)] font-semibold">Tensor</span>, collaborating to push the boundaries of AI engineering.
			</p>

			{/* Circuit pattern element */}
			<div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-[50%] h-[2px] bg-[hsla(var(--electric-cyan),0.15)] z-0">
				<div className="absolute top-0 left-1/4 w-[2px] h-12 bg-[hsla(var(--electric-cyan),0.15)]"></div>
				<div className="absolute top-0 left-2/4 w-[2px] h-8 bg-[hsla(var(--electric-cyan),0.15)]"></div>
				<div className="absolute top-0 left-3/4 w-[2px] h-16 bg-[hsla(var(--electric-cyan),0.15)]"></div>
			</div>

			{/* Filter Buttons */}
			<div className="flex flex-wrap justify-center items-center gap-3 mb-12 relative z-10">
				{isMobile && (
					<button
						onClick={handlePrevSection}
						className="px-3 py-3 rounded-full text-xl flex items-center transition-all duration-300 text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
						style={{
							backgroundImage: 'linear-gradient(135deg, hsla(var(--electric-cyan),0.8), hsla(var(--digital-purple),0.8))',
						}}
					>
						<FaArrowLeft />
					</button>
				)}
				{isMobile ? (
					<div className="flex flex-col items-center gap-2">
						<button
							className="mobile-category-indicator px-6 py-2.5 rounded-lg border-none transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(0,0,0,0.15)] text-white"
							style={{ 
								minWidth: "160px", 
								fontFamily: 'var(--font-space-grotesk)', 
								fontSize: "1rem",
								backgroundImage: `linear-gradient(135deg, hsla(var(--electric-cyan),1), hsla(var(--digital-purple),1))`,
								backgroundSize: '200% 200%',
								animation: 'gradient-shift 3s ease infinite alternate'
							}}
						>
							{categories[currentCategoryIndex].label}
						</button>
						<div className="text-xs text-[hsla(var(--muted-foreground),1)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
							Tap arrows to change category
						</div>
					</div>
				) : (
					// Explicit mapping with solid hex-based gradients to avoid any CSS variable rendering issues
					(() => {
						const categoryGradients: Record<string,string> = {
							all: 'linear-gradient(135deg,#06b6d4,#2563eb)',
							staff: 'linear-gradient(135deg,#8b5cf6,#6366f1)',
							core: 'linear-gradient(135deg,#06b6d4,#8b5cf6)',
							webdev: 'linear-gradient(135deg,#0ea5e9,#06b6d4)',
							pr: 'linear-gradient(135deg,#8b5cf6,#db2777)',
							research: 'linear-gradient(135deg,#06b6d4,#0d9488)',
							media: 'linear-gradient(135deg,#db2777,#f97316)',
							logistics: 'linear-gradient(135deg,#0d9488,#22c55e)'
						};

						return categories.map(cat => {
							const isActive = filter === cat.key;
							const gradient = categoryGradients[cat.key] || categoryGradients.all;
							return (
								<button
									key={cat.key}
									onClick={() => setFilter(cat.key)}
									className={`relative px-5 py-2 rounded-lg transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsla(var(--electric-cyan),0.6)] ${
										isActive ? 'scale-105 shadow-[0_0_18px_rgba(0,0,0,0.35)]' : 'hover:scale-105 shadow-[0_0_6px_rgba(0,0,0,0.15)]'
									}`}
									style={{
										fontFamily: 'var(--font-space-grotesk)',
										fontWeight: 600,
										background: gradient,
										backgroundSize: '220% 220%',
										backgroundPosition: isActive ? '80% 50%' : '20% 50%',
										animation: 'gradient-shift 4s ease-in-out infinite',
										color: '#fff',
										border: '1px solid rgba(255,255,255,0.08)'
									}}
								>
									<span className="relative z-10">
										{cat.label}
									</span>
									{/* subtle overlay for inactive for depth */}
									{!isActive && (
										<span className="absolute inset-0 bg-black/10" />
									)}
								</button>
							);
						});
					})()
				)}
				{isMobile && (
					<button
						onClick={handleNextSection}
						className="px-3 py-3 rounded-full text-xl flex items-center transition-all duration-300 text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
						style={{
							backgroundImage: 'linear-gradient(135deg, hsla(var(--digital-purple),0.8), hsla(var(--electric-cyan),0.8))',
						}}
					>
						<FaArrowRight />
					</button>
				)}
			</div>

			{/* Members Grid (centered for all resolutions) */}
			<div
				ref={containerRef}
				className="flex flex-wrap justify-center items-center gap-6 mx-auto relative z-10"
				style={{ maxWidth: "1200px" }}
			>
				{filteredMembers.map((member, index) => (
					<div
						key={index}
						className="team-card bg-[hsla(var(--card),0.9)] backdrop-blur rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-5 hover:scale-105 transition-transform duration-300 relative group border border-[hsla(var(--border),0.6)]"
						style={{
							width: "260px",
							minWidth: "260px",
							maxWidth: "260px",
							height: "340px",
							minHeight: "340px",
							maxHeight: "340px",
							willChange: "transform, opacity",
							position: "relative"
						}}
					>
						<img
							src={member.image}
							alt={member.name}
							className="object-cover rounded-full border-4 border-[hsla(var(--electric-cyan),0.7)]"
							style={{
								width: "136px",
								height: "136px",
								objectFit: "cover",
								borderRadius: "9999px"
							}}
						/>
						{/* Fixed spacing between image and name */}
						<div style={{ height: "24px" }} />
						<div className="relative w-full flex flex-col items-center justify-center">
							{/* Always show name */}
							<h2
								className="text-lg font-bold"
								ref={el => { nameRefs.current[index] = el; }}
								style={{ fontFamily: 'var(--font-unbounded)' }}
							>
								{member.name}
							</h2>
							{/* Fade out designation/year on hover */}
							<div className="transition-opacity duration-300 group-hover:opacity-0">
								<p className="text-[hsla(var(--electric-cyan),1)] text-base" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{member.designation}</p>
								<p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-geist-mono)' }}>{member.year}</p>
							</div>
						</div>
						{/* Social Icons fixed at bottom */}
						<div
							className="absolute left-0 right-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								bottom: "32px",
								position: "absolute"
							}}
						>
							{member.socials?.instagram && (
								<a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
									<FaInstagram className="text-[hsla(var(--magenta),0.9)] text-2xl hover:text-[hsla(var(--magenta),1)] hover:shadow-[0_0_8px_hsla(var(--magenta),0.8)]" />
								</a>
							)}
							{member.socials?.linkedin && (
								<a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
									<FaLinkedin className="text-[hsla(var(--electric-cyan),0.9)] text-2xl hover:text-[hsla(var(--electric-cyan),1)] hover:shadow-[0_0_8px_hsla(var(--electric-cyan),0.8)]" />
								</a>
							)}
							{member.socials?.github && (
								<a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
									<FaGithub className="text-[hsla(var(--digital-purple),0.9)] text-2xl hover:text-[hsla(var(--digital-purple),1)] hover:shadow-[0_0_8px_hsla(var(--digital-purple),0.8)]" />
								</a>
							)}
						</div>
					</div>
				))}
			</div>
			
			{/* Code symbols */}
			<div className="absolute top-[15%] left-[10%] text-[hsla(var(--electric-cyan),0.2)] text-4xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
			<div className="absolute bottom-[25%] right-[12%] text-[hsla(var(--digital-purple),0.2)] text-3xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>
		</div>
	);
}
