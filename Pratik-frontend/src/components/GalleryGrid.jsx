// import React, { useEffect, useRef, useState } from "react";

// export default function GalleryGrid() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   // counters' displayed values
//   const [yearsValue, setYearsValue] = useState(0);
//   const [clientsValue, setClientsValue] = useState(0);

//   // hover index for images (null when none)
//   const [hoverIdx, setHoverIdx] = useState(null);

//   // targets
//   const YEARS_TARGET = 10; // will display "10+" after counting
//   const CLIENTS_TARGET = 1251;

//   // images used in center
//   const images = [
//     "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3697.jpg",
//     "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3698.jpg",
//     "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3699.jpg",
//   ];

//   // IntersectionObserver to set visible when section enters viewport
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisible(true);
//             obs.disconnect();
//           }
//         });
//       },
//       { threshold: 0.35 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   // count-up animation helper
//   useEffect(() => {
//     if (!visible) return;
//     let rafId;
//     const duration = 1400; // ms
//     const start = performance.now();

//     function step(now) {
//       const t = Math.min(1, (now - start) / duration);
//       // easeOutCubic
//       const ease = 1 - Math.pow(1 - t, 3);

//       setYearsValue(Math.floor(ease * YEARS_TARGET));
//       setClientsValue(Math.floor(ease * CLIENTS_TARGET));

//       if (t < 1) {
//         rafId = requestAnimationFrame(step);
//       } else {
//         // ensure final exact values
//         setYearsValue(YEARS_TARGET);
//         setClientsValue(CLIENTS_TARGET);
//       }
//     }

//     rafId = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(rafId);
//   }, [visible]);

//   // helper to get transform for an image based on hover state and position
//   function imageStyle(posIndex, base) {
//     // posIndex: 0 = left, 1 = center, 2 = right
//     const isHovered = hoverIdx === posIndex;
//     const scale = isHovered ? 1.12 : 1;
//     const transition = "transform 280ms cubic-bezier(.2,.9,.3,1)";
//     // slight translate for visual overlap
//     if (posIndex === 0) {
//       return {
//         width: base.width,
//         height: base.height,
//         objectFit: "cover",
//         marginRight: base.overlap,
//         zIndex: 1,
//         transform: `scale(${scale}) translateX(-${isHovered ? 6 : 0}px)`,
//         transition,
//         cursor: "pointer",
//         borderRadius: base.radiusLeft,
//         boxShadow: isHovered ? "0 18px 45px rgba(0,0,0,0.18)" : "0 10px 30px rgba(0,0,0,0.09)"
//       };
//     }
//     if (posIndex === 1) {
//       return {
//         width: base.centerWidth,
//         height: base.centerHeight,
//         objectFit: "cover",
//         borderRadius: base.radiusCenter,
//         zIndex: 3,
//         transform: `scale(${scale})`,
//         transition,
//         cursor: "pointer",
//         boxShadow: isHovered ? "0 26px 70px rgba(0,0,0,0.28)" : "0 18px 50px rgba(0,0,0,0.2)"
//       };
//     }
//     // posIndex === 2
//     return {
//       width: base.width,
//       height: base.height,
//       objectFit: "cover",
//       marginLeft: base.overlap,
//       zIndex: 1,
//       transform: `scale(${scale}) translateX(${isHovered ? 6 : 0}px)`,
//       transition,
//       cursor: "pointer",
//       borderRadius: base.radiusRight,
//       boxShadow: isHovered ? "0 18px 45px rgba(0,0,0,0.18)" : "0 10px 30px rgba(0,0,0,0.09)"
//     };
//   }

//   // base sizing (responsive-friendly)
//   const baseSizes = {
//     // left/right small
//     width: "200px",
//     height: "200px",
//     overlap: "-70px",
//     // center big
//     centerWidth: "320px",
//     centerHeight: "320px",
//     // borderRadius approximations to mimic oval center
//     radiusLeft: "50%",
//     radiusRight: "50%",
//     radiusCenter: "45%",
//   };

//   return (
//     <section ref={ref} className="py-5 bg-white">
//       <div className="container">
//         <div className="row text-center align-items-center justify-content-center">

//           {/* LEFT STAT */}
//           <div className="col-md-3 mb-4">
//             <h1
//               className="fw-bold"
//               style={{ color: "#b8860b", fontSize: "52px", marginBottom: 6 }}
//             >
//               {yearsValue}
//               {yearsValue >= YEARS_TARGET ? "+" : ""}
//             </h1>
//             <p className="text-uppercase fw-semibold" style={{ color: "#806843" }}>
//               Years Of Experience
//             </p>
//           </div>

//           {/* CENTER IMAGES */}
//           <div className="col-md-6 mb-4 d-flex justify-content-center align-items-center">
//             <div className="d-flex align-items-center justify-content-center position-relative" style={{ gap: 0 }}>

//               {/* LEFT small */}
//               <img
//                 src={images[0]}
//                 alt=""
//                 className="d-none d-md-block"
//                 onMouseEnter={() => setHoverIdx(0)}
//                 onMouseLeave={() => setHoverIdx(null)}
//                 style={imageStyle(0, baseSizes)}
//               />

//               {/* CENTER big */}
//               <img
//                 src={images[1]}
//                 alt=""
//                 onMouseEnter={() => setHoverIdx(1)}
//                 onMouseLeave={() => setHoverIdx(null)}
//                 style={imageStyle(1, baseSizes)}
//               />

//               {/* RIGHT small */}
//               <img
//                 src={images[2]}
//                 alt=""
//                 className="d-none d-md-block"
//                 onMouseEnter={() => setHoverIdx(2)}
//                 onMouseLeave={() => setHoverIdx(null)}
//                 style={imageStyle(2, baseSizes)}
//               />
//             </div>
//           </div>

//           {/* RIGHT STAT */}
//           <div className="col-md-3 mb-4">
//             <h1
//               className="fw-bold"
//               style={{ color: "#b8860b", fontSize: "52px", marginBottom: 6 }}
//             >
//               {clientsValue >= 1000
//                 ? clientsValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 : clientsValue}
//               {clientsValue >= CLIENTS_TARGET ? "+" : ""}
//             </h1>
//             <p className="text-uppercase fw-semibold" style={{ color: "#806843" }}>
//               Happy Client
//             </p>
//           </div>
//         </div>

//         {/* TAGLINE */}
//         <div className="text-center mt-4">
//           <h4 style={{ color: "#b8860b", fontWeight: 600 }}>
//             WE ARE HERE TO HELP YOU TO REMEMBER THE BEST DAYS.
//           </h4>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function GalleryGrid() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // 🔹 backend content
  const [content, setContent] = useState(null);

  // counters
  const [yearsValue, setYearsValue] = useState(0);
  const [clientsValue, setClientsValue] = useState(0);

  // hover index
  const [hoverIdx, setHoverIdx] = useState(null);

  // 🔹 FETCH FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery-stats")
      .then((res) => setContent(res.data))
      .catch(() => {});
  }, []);

  // targets (fallback if backend empty)
  const YEARS_TARGET = content?.years || 10;
  const CLIENTS_TARGET = content?.clients || 1251;

  // images (fallback)
  const images =
    content?.images?.length === 3
      ? content.images
      : [
          "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3697.jpg",
          "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3698.jpg",
          "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3699.jpg",
        ];

  // IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // count animation
  useEffect(() => {
    if (!visible) return;

    let rafId;
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);

      setYearsValue(Math.floor(ease * YEARS_TARGET));
      setClientsValue(Math.floor(ease * CLIENTS_TARGET));

      if (t < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [visible, YEARS_TARGET, CLIENTS_TARGET]);

  // image style helper
  function imageStyle(posIndex, base) {
    const isHovered = hoverIdx === posIndex;
    const scale = isHovered ? 1.12 : 1;
    const transition = "transform 280ms cubic-bezier(.2,.9,.3,1)";

    const common = {
      objectFit: "cover",
      transition,
      cursor: "pointer",
      boxShadow: isHovered
        ? "0 22px 60px rgba(0,0,0,0.25)"
        : "0 12px 30px rgba(0,0,0,0.12)",
    };

    if (posIndex === 1) {
      return {
        ...common,
        width: base.centerWidth,
        height: base.centerHeight,
        borderRadius: base.radiusCenter,
        zIndex: 3,
        transform: `scale(${scale})`,
      };
    }

    return {
      ...common,
      width: base.width,
      height: base.height,
      borderRadius: posIndex === 0 ? base.radiusLeft : base.radiusRight,
      marginLeft: posIndex === 2 ? base.overlap : undefined,
      marginRight: posIndex === 0 ? base.overlap : undefined,
      zIndex: 1,
      transform: `scale(${scale})`,
    };
  }

  const baseSizes = {
    width: "200px",
    height: "200px",
    overlap: "-70px",
    centerWidth: "320px",
    centerHeight: "320px",
    radiusLeft: "50%",
    radiusRight: "50%",
    radiusCenter: "45%",
  };

  return (
    <section ref={ref} className="py-5 bg-white">
      <div className="container-fluid px-4 px-md-5">
        <div className="row text-center align-items-center justify-content-center">

          {/* LEFT */}
          <div className="col-md-3 mb-4">
            <h1 className="fw-bold" style={{ color: "#b8860b", fontSize: 52 }}>
              {yearsValue}+
            </h1>
            <p className="text-uppercase fw-semibold" style={{ color: "#806843" }}>
              Years Of Experience
            </p>
          </div>

          {/* CENTER */}
          <div className="col-md-6 mb-4 d-flex justify-content-center">
            <div className="d-flex align-items-center position-relative">
              <img
                src={images[0]}
                className="d-none d-md-block"
                onMouseEnter={() => setHoverIdx(0)}
                onMouseLeave={() => setHoverIdx(null)}
                style={imageStyle(0, baseSizes)}
              />
              <img
                src={images[1]}
                onMouseEnter={() => setHoverIdx(1)}
                onMouseLeave={() => setHoverIdx(null)}
                style={imageStyle(1, baseSizes)}
              />
              <img
                src={images[2]}
                className="d-none d-md-block"
                onMouseEnter={() => setHoverIdx(2)}
                onMouseLeave={() => setHoverIdx(null)}
                style={imageStyle(2, baseSizes)}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-3 mb-4">
            <h1 className="fw-bold" style={{ color: "#b8860b", fontSize: 52 }}>
              {clientsValue.toLocaleString()}+
            </h1>
            <p className="text-uppercase fw-semibold" style={{ color: "#806843" }}>
              Happy Clients
            </p>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="text-center mt-4">
          <h4 style={{ color: "#b8860b", fontWeight: 600 }}>
            {content?.tagline ||
              "WE ARE HERE TO HELP YOU TO REMEMBER THE BEST DAYS."}
          </h4>
        </div>
      </div>
    </section>
  );
}
