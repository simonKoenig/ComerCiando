// Numero comercial en formato internacional, sin + ni espacios.
const WHATSAPP_NUMBER = "542214769949";

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  const message = link.dataset.message || "Hola, quiero conocer ComerCiando.";
  if (WHATSAPP_NUMBER) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
});

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const promoPlayer = document.querySelector("[data-promo-player]");
const promoScenes = Array.from(document.querySelectorAll("[data-promo-scene]"));
const promoDots = Array.from(document.querySelectorAll("[data-promo-dot]"));
const promoToggle = document.querySelector("[data-promo-toggle]");
const promoToggleLabel = document.querySelector("[data-promo-toggle-label]");
let promoIndex = 0;
let promoTimer = null;

const showPromoScene = (index) => {
  promoIndex = index;
  promoScenes.forEach((scene, sceneIndex) => scene.classList.toggle("active", sceneIndex === index));
  promoDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
};

const pausePromo = () => {
  window.clearInterval(promoTimer);
  promoTimer = null;
  promoPlayer?.classList.remove("is-playing");
  promoToggle?.setAttribute("aria-label", "Reproducir demostración");
  if (promoToggleLabel) promoToggleLabel.textContent = "Reproducir";
};

const playPromo = () => {
  window.clearInterval(promoTimer);
  promoPlayer?.classList.add("is-playing");
  promoToggle?.setAttribute("aria-label", "Pausar demostración");
  if (promoToggleLabel) promoToggleLabel.textContent = "Pausar demo";
  promoTimer = window.setInterval(() => showPromoScene((promoIndex + 1) % promoScenes.length), 4200);
};

if (promoPlayer && promoScenes.length) {
  showPromoScene(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    playPromo();
  } else {
    pausePromo();
  }

  promoToggle?.addEventListener("click", () => {
    if (promoTimer) {
      pausePromo();
    } else {
      playPromo();
    }
  });

  promoDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showPromoScene(index);
      if (promoTimer) playPromo();
    });
  });
}

const form = document.querySelector("#lead-form");
const formMessage = document.querySelector("#form-message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("nombre")?.toString().trim() || "";
  const business = data.get("comercio")?.toString().trim() || "mi comercio";
  const message = `Hola, soy ${name}. Tengo ${business}. Quiero probar ComerCiando gratis por 7 dias y coordinar la puesta en marcha.`;

  if (WHATSAPP_NUMBER) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    formMessage.textContent = "Consulta preparada y copiada. Configura tu WhatsApp comercial antes de publicar.";
  } catch {
    formMessage.textContent = "Configura tu numero de WhatsApp comercial antes de publicar la pagina.";
  }
  formMessage.classList.add("feedback");
});
