// Completar con el numero comercial en formato internacional, sin + ni espacios.
// Ejemplo Argentina: "5491112345678".
const WHATSAPP_NUMBER = "542214769949";

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

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

const form = document.querySelector("#lead-form");
const formMessage = document.querySelector("#form-message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("nombre")?.toString().trim() || "";
  const business = data.get("comercio")?.toString().trim() || "mi comercio";
  const location = data.get("localidad")?.toString().trim();
  const query = data.get("consulta")?.toString().trim() || "Me interesa conocer ComerCiando.";
  const locationText = location ? ` en ${location}` : "";
  const message = `Hola, soy ${name}. Tengo ${business}${locationText}. ${query} Quisiera coordinar una demo.`;

  if (WHATSAPP_NUMBER) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    formMessage.textContent = "Consulta preparada y copiada. Configurá tu WhatsApp comercial antes de publicar.";
  } catch {
    formMessage.textContent = "Configurá tu número de WhatsApp comercial antes de publicar la página.";
  }
  formMessage.classList.add("feedback");
});
