// Animation cây thông Noel với GSAP
(function () {
  // Đợi DOM và GSAP load xong
  function initTreeAnimation() {
    // Kiểm tra GSAP đã load chưa
    if (typeof gsap === "undefined") {
      console.log("Đang đợi GSAP load...");
      setTimeout(initTreeAnimation, 100);
      return;
    }

    console.log("Bắt đầu khởi tạo animation cây thông...");

    // Đăng ký MotionPathPlugin (miễn phí)
    if (typeof MotionPathPlugin !== "undefined") {
      gsap.registerPlugin(MotionPathPlugin);
      console.log("MotionPathPlugin đã được đăng ký");
    } else {
      console.warn(
        "MotionPathPlugin không có, một số animation có thể không hoạt động"
      );
    }

    // Lấy các elements
    var pContainer = document.querySelector(".pContainer");
    var mainSVG = document.querySelector(".mainSVG");
    var sparkle = document.querySelector(".sparkle");

    if (!mainSVG) {
      console.error("Không tìm thấy .mainSVG");
      return;
    }

    if (!sparkle) {
      console.error("Không tìm thấy .sparkle");
      return;
    }

    // Cấu hình
    var e = true; // Flag để tạo particles
    var colors =
      "#E8F6F8 #ACE8F8 #F6FBFE #A2CBDC #B74551 #5DBA72 #910B28 #910B28 #446D39".split(
        " "
      );
    var shapes = ["#star", "#circ", "#cross", "#heart"];
    var particles = [];
    var particleIndex = 0;

    // Hiển thị SVG
    gsap.set("svg", { visibility: "visible" });
    gsap.set(sparkle, { transformOrigin: "50% 50%", y: -100 });

    // Function để tạo animation opacity cho particles
    function animateParticleOpacity(particle) {
      gsap.killTweensOf(particle, { opacity: true });
      gsap.fromTo(
        particle,
        { opacity: 1 },
        { duration: 0.07, opacity: Math.random(), repeat: -1 }
      );
    }

    // Function để tạo particle mới
    function createParticle() {
      if (!e || particles.length === 0) return;

      var particle = particles[particleIndex];
      if (!particle) return;

      var pContainerX = gsap.getProperty(".pContainer", "x") || 0;
      var pContainerY = gsap.getProperty(".pContainer", "y") || 0;

      gsap.set(particle, {
        x: pContainerX,
        y: pContainerY,
        scale: gsap.utils.random(0.5, 3, 0.001, true),
      });

      gsap.timeline().to(particle, {
        duration: gsap.utils.random(0.61, 6),
        x: gsap.utils.random(-200, 1000),
        y: gsap.utils.random(-200, 800),
        scale: 0,
        rotation: gsap.utils.random(-123, 360),
        ease: "power1",
        onStart: animateParticleOpacity,
        onStartParams: [particle],
        onRepeat: function (p) {
          gsap.set(p, { scale: gsap.utils.random(0.5, 3, 0.001, true) });
        },
        onRepeatParams: [particle],
      });

      particleIndex++;
      if (particleIndex >= particles.length) {
        particleIndex = 0;
      }
    }

    // Tạo particles
    function createParticles() {
      for (var i = 0; i < 201; i++) {
        var shapeSelector = shapes[i % shapes.length];
        var shapeElement = document.querySelector(shapeSelector);
        if (!shapeElement) continue;

        var particle = shapeElement.cloneNode(true);
        mainSVG.appendChild(particle);
        particle.setAttribute("fill", colors[i % colors.length]);
        particle.setAttribute("class", "particle");
        particles.push(particle);
        gsap.set(particle, {
          x: -100,
          y: -100,
          transformOrigin: "50% 50%",
        });
      }
      console.log("Đã tạo " + particles.length + " particles");
    }

    // Tạo particles
    createParticles();

    // Tạo timeline chính
    var mainTimeline = gsap.timeline({ delay: 0.5, repeat: 0 });
    var particleTimeline;

    // Timeline cho particles với MotionPath
    function createParticleTimeline() {
      particleTimeline = gsap.timeline({ onUpdate: createParticle });

      // Sử dụng MotionPath nếu có
      if (typeof MotionPathPlugin !== "undefined") {
        try {
          particleTimeline.to(".pContainer, .sparkle", {
            duration: 6,
            motionPath: {
              path: ".treePath",
              autoRotate: false,
            },
            ease: "linear",
          });

          var treeBottomPath = document.querySelector(".treeBottomPath");
          if (treeBottomPath) {
            particleTimeline
              .to(".pContainer, .sparkle", {
                duration: 1,
                onStart: function () {
                  e = false;
                },
                x: 400,
                y: 480,
              })
              .to(
                ".pContainer, .sparkle",
                {
                  duration: 2,
                  onStart: function () {
                    e = true;
                  },
                  motionPath: {
                    path: ".treeBottomPath",
                    autoRotate: false,
                  },
                  ease: "linear",
                },
                "-=0"
              );
          }
        } catch (error) {
          console.warn("Lỗi MotionPath:", error);
          // Fallback: di chuyển đơn giản
          particleTimeline.to(".pContainer, .sparkle", {
            duration: 6,
            x: 400,
            y: 200,
            ease: "linear",
          });
        }
      } else {
        // Fallback: di chuyển đơn giản
        particleTimeline.to(".pContainer, .sparkle", {
          duration: 6,
          x: 400,
          y: 200,
          ease: "linear",
        });
      }
    }

    createParticleTimeline();

    // Animation vẽ cây thông bằng stroke-dasharray (không cần DrawSVG)
    var treePathMask = document.querySelector(".treePathMask");
    var treePotMask = document.querySelector(".treePotMask");
    var treeBottomMask = document.querySelector(".treeBottomMask");

    if (treePathMask) {
      try {
        var pathLength = treePathMask.getTotalLength();
        treePathMask.style.strokeDasharray = pathLength;
        treePathMask.style.strokeDashoffset = pathLength;

        mainTimeline.to(treePathMask, {
          duration: 6,
          strokeDashoffset: 0,
          ease: "linear",
        });
        console.log("Đã setup animation cho treePathMask");
      } catch (error) {
        console.warn("Lỗi khi setup treePathMask:", error);
        mainTimeline.to(treePathMask, {
          duration: 6,
          opacity: 1,
          ease: "linear",
        });
      }
    }

    if (treePotMask) {
      try {
        var potLength = treePotMask.getTotalLength();
        treePotMask.style.strokeDasharray = potLength;
        treePotMask.style.strokeDashoffset = potLength;

        mainTimeline.to(
          treePotMask,
          {
            duration: 2,
            strokeDashoffset: 0,
            ease: "linear",
          },
          "-=1"
        );
      } catch (error) {
        mainTimeline.to(
          treePotMask,
          {
            duration: 2,
            opacity: 1,
            ease: "linear",
          },
          "-=1"
        );
      }
    }

    if (treeBottomMask) {
      try {
        var bottomLength = treeBottomMask.getTotalLength();
        treeBottomMask.style.strokeDasharray = bottomLength;
        treeBottomMask.style.strokeDashoffset = bottomLength;

        mainTimeline.to(
          treeBottomMask,
          {
            duration: 2,
            strokeDashoffset: 0,
            ease: "linear",
          },
          "-=2"
        );
      } catch (error) {
        mainTimeline.to(
          treeBottomMask,
          {
            duration: 2,
            opacity: 1,
            ease: "linear",
          },
          "-=2"
        );
      }
    }

    // Animation ngôi sao
    var treeStar = document.querySelector(".treeStar");
    if (treeStar) {
      mainTimeline.from(
        ".treeStar",
        {
          duration: 3,
          scaleY: 0,
          scaleX: 0.15,
          transformOrigin: "50% 50%",
          ease: "elastic(1, 0.5)",
        },
        "-=4"
      );
    }

    // Animation sparkle
    mainTimeline.to(
      ".sparkle",
      {
        duration: 3,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0"
    );

    var treeStarOutline = document.querySelector(".treeStarOutline");
    if (treeStarOutline) {
      mainTimeline.to(
        ".treeStarOutline",
        {
          duration: 1,
          opacity: 1,
          ease: "power2.out",
        },
        "+=1"
      );
    }

    // Thêm particle timeline vào main timeline
    if (particleTimeline) {
      mainTimeline.add(particleTimeline, 0);
    }

    // Tăng tốc độ animation
    gsap.globalTimeline.timeScale(1.5);

    console.log("✅ Animation cây thông Noel đã được khởi tạo");
  }

  // Chờ DOM và GSAP load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(initTreeAnimation, 1000); // Đợi GSAP và các plugin load
    });
  } else {
    setTimeout(initTreeAnimation, 1000);
  }
})();
