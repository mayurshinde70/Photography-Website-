import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
// import Serviceshome from "../components/Serviceshome";
import GalleryGrid from "../components/GalleryGrid";
// import About from "../components/About";
// import Packages from "../components/Packages";
import Contact from "./Contact";


export default function Home() {
  const location = useLocation();
  const [mode, setMode] = useState(null);

   

  return (
    <main className="mt-5">

      {/* HERO */}
      <Hero />
    <section className="py-5 bg-light">
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "1200px",   // 🔥 width वाढवली
          padding: "0 20px"     // 🔥 side space control
        }}
      >
        <h1
          className="mb-3"
          style={{
            fontFamily: "serif",
            fontWeight: 400,
            letterSpacing: "1px",
            lineHeight: "1.3"
          }}
        >
          Hello. My name is <strong>PBK Films</strong>, 
          I’m a wedding photographer in<br />
          Pune & Mumbai
        </h1>

        <p
          className="text-muted fs-5 mt-4"
          style={{ letterSpacing: "3px" }}
        >
          dedicated to telling honest & authentic moments in weddings
        </p>
      </div>
    </section>
      <GalleryGrid />
  <section className="py-5 bg-white">
 <div
        className="mx-auto text-center"
        style={{
          maxWidth: "1200px",   // 🔥 width वाढवली
          padding: "0 20px"     // 🔥 side space control
        }}
      >
        {/* MAIN HEADING */}
        <h2
          className="text-center mb-4"
          style={{ letterSpacing: "2px", fontWeight: 300 }}
        >
          Your story is worth <em>sharing</em>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-center text-muted fs-5 lh-lg">
          Hello! It’s amazing to have you here. Every memory you see on this
          page exists because couples like you trusted us to be a part of their
          special day. Without them, this space would be just another blank
          website—but instead, it’s filled with love, laughter, and moments
          that truly matter.
        </p>

        <p className="text-center text-muted fs-5 lh-lg mt-4">
          We love weddings. We love people. And we love the beautiful chaos that
          makes every wedding uniquely unforgettable. So take your time, look
          around, and if you feel a connection—let’s create something timeless
          together.
        </p>

        <p className="text-center text-muted fs-6 mt-4">
          Hope we’re the perfect fit 🤍
        </p>

      </div>
    </section>

      {/* DESCRIPTION SECTION */}
      {/* <section className="home-intro-section text-center py-5 px-3">
        <div className="container" style={{ maxWidth: "850px" }}>
          <h2 className="display-6 fw-bold mb-3">
            Capturing Emotions, Moments & Memories
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.15rem", lineHeight: 1.7 }}>
            Every wedding is a once-in-a-lifetime story.  
            At our studio, we blend candid moments with timeless visuals — crafting
            films and photos that reflect your journey, your emotions, and your
            celebration in all its beauty.
          </p>

         
        </div>
      </section> */}

      {/* OPTIONAL — you can uncomment if you want them later */}
      {/* <Serviceshome /> */}
      {/* <Packages /> */}

      {/* CONTACT */}
      <Contact />

    </main>
  );
}




// import React from "react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <>
//       {/* ================= HERO ================= */}
//       <section
//         style={{
//           minHeight: "100vh",
//           backgroundImage:
//             "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.4)), url('https://images.unsplash.com/photo-1523438885200-e635ba2c371e')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         className="d-flex align-items-center"
//       >
//         <div className="container">
//           <div className="col-md-7 text-white">
//             <h1 className="display-4 fw-bold mb-3">
//               Turning Your Wedding
//               <br /> Into a Cinematic Love Story
//             </h1>
//             <p className="lead mb-4">
//               Timeless photography & films crafted with emotion,
//               elegance and storytelling.
//             </p>

//             <div className="d-flex gap-3">
//               <Link to="/packages" className="btn btn-warning btn-lg fw-bold">
//                 View Packages
//               </Link>
//               <Link to="/contact" className="btn btn-outline-light btn-lg">
//                 Get Consultation
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= STATS ================= */}
//       <section className="py-5 bg-white">
//         <div className="container">
//           <div className="row text-center">
//             {[
//               { num: "10+", label: "Years Experience" },
//               { num: "1250+", label: "Happy Couples" },
//               { num: "500+", label: "Weddings Shot" },
//               { num: "50+", label: "Cities Covered" },
//             ].map((s, i) => (
//               <div key={i} className="col-6 col-md-3 mb-4">
//                 <h1 className="fw-bold text-warning">{s.num}</h1>
//                 <p className="text-muted fw-semibold">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section className="py-5 bg-light">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">Why Couples Choose Us</h2>
//             <p className="text-muted">
//               Because your wedding deserves more than just photos.
//             </p>
//           </div>

//           <div className="row g-4 text-center">
//             {[
//               {
//                 title: "Cinematic Storytelling",
//                 desc: "We capture emotions, not poses.",
//               },
//               {
//                 title: "Premium Equipment",
//                 desc: "Latest cameras, drones & cinematic gear.",
//               },
//               {
//                 title: "Experienced Team",
//                 desc: "10+ years of wedding expertise.",
//               },
//               {
//                 title: "On-Time Delivery",
//                 desc: "Your memories delivered without delay.",
//               },
//             ].map((f, i) => (
//               <div key={i} className="col-md-3">
//                 <div className="p-4 bg-white shadow-sm rounded h-100">
//                   <h5 className="fw-bold">{f.title}</h5>
//                   <p className="text-muted">{f.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= OUR PROCESS ================= */}
//       <section className="py-5 bg-white">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">Our Wedding Process</h2>
//             <p className="text-muted">
//               Simple, smooth & stress-free experience.
//             </p>
//           </div>

//           <div className="row text-center g-4">
//             {[
//               "Consultation & Planning",
//               "Wedding Day Coverage",
//               "Cinematic Editing",
//               "Final Delivery",
//             ].map((step, i) => (
//               <div key={i} className="col-md-3">
//                 <div className="border rounded p-4 h-100">
//                   <h1 className="text-warning fw-bold">{i + 1}</h1>
//                   <h6 className="fw-bold mt-2">{step}</h6>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="py-5 bg-light">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">What Our Couples Say</h2>
//           </div>

//           <div className="row g-4">
//             {[
//               {
//                 name: "Amit & Pooja",
//                 text: "Our wedding film felt like a movie. Pure magic!",
//               },
//               {
//                 name: "Rahul & Sneha",
//                 text: "Every emotion captured beautifully. Highly recommended!",
//               },
//               {
//                 name: "Akshay & Neha",
//                 text: "Professional team and stunning output.",
//               },
//             ].map((t, i) => (
//               <div key={i} className="col-md-4">
//                 <div className="bg-white p-4 shadow-sm rounded h-100">
//                   <p className="fst-italic text-muted">“{t.text}”</p>
//                   <h6 className="fw-bold mt-3 mb-0">{t.name}</h6>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= FINAL CTA ================= */}
//       <section className="py-5 bg-warning text-center">
//         <div className="container">
//           <h2 className="fw-bold mb-3">
//             Let’s Create Your Wedding Film Together
//           </h2>
//           <Link to="/contact" className="btn btn-dark btn-lg fw-bold">
//             Book Free Consultation
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }
