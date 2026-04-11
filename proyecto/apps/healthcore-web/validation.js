const i18n = {
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_locations: "Locations",
        nav_request: "Appointment",
        hero_title: "Healthcare that fits your life",
        hero_subtitle: "12 outpatient clinics in the US and UK with bilingual care.",
        cta_btn: "Request an Appointment",
        services_title: "Our Services",
        s1_title: "Primary Care",
        s1_desc: "Chronic disease management including diabetes, hypertension, and asthma.",
        s2_title: "Specialists",
        s2_desc: "Cardiology, endocrinology, pulmonology, and women health within our network.",
        s3_title: "Preventive Health",
        s3_desc: "Check-ups, vaccinations, and mental health counseling for your wellbeing.",
        loc_title: "US Locations",
        th_name: "Clinic Name",
        th_city: "City",
        th_phone: "Phone",
        th_hours: "Hours",
        h_austin_c: "Mon-Fri 7am-8pm | Sat 9am-3pm",
        h_austin_n: "Mon-Fri 8am-7pm",
        h_sa: "Mon-Fri 8am-6pm | Sat 9am-1pm",
        h_miami: "Mon-Fri 7am-8pm | Sat 9am-4pm",
        h_atl: "Mon-Fri 8am-7pm",
        footer_rights: "All rights reserved.",
        footer_contact: "Contact",
        footer_social: "Follow Us",
        form_title: "Patient Inquiry",
        form_subtitle: "Complete the information below to request a call.",
        l_fname: "First Name",
        l_lname: "Last Name",
        l_dob: "Date of Birth",
        l_phone: "Phone Number (+Country Code)",
        l_service: "Required Service",
        l_clinic: "Preferred Clinic",
        l_insurance_q: "Do you have medical insurance?",
        v_yes: "Yes",
        v_no: "No",
        l_concern: "Reason for consultation",
        l_consent: "I consent to HealthCore contacting me to confirm the appointment.",
        partner_note: "Are you a healthcare provider or organization? Contact partnerships@healthcore.com",
        success_h: "Inquiry Sent Successfully",
        success_p: "We have received your inquiry. A member of our reception team will contact you within 1 business day.",
        back_home: "Return to Homepage",
        submit_btn: "Send Inquiry",
        opt_select: "Select...",
        opt_primary: "Primary Care",
        opt_chronic: "Chronic Disease Management",
        opt_paediatric: "Paediatric Care",
        opt_specialist: "Specialist Consultation",
        ph_provider: "Provider Name",
        ph_mid: "Member ID",
        err_name: "Name must contain only letters and at least 2 characters.",
        err_phone: "Enter a valid phone number with country code.",
        err_paediatric: "Paediatric Care is available for patients under 18 years.",
        warn_evening: "Warning: This clinic closes before or at 6:00 PM. Evening slots may not be available."
    },
    es: {
        nav_home: "Inicio",
        nav_services: "Servicios",
        nav_locations: "Ubicaciones",
        nav_request: "Cita",
        hero_title: "Atencion medica que se adapta a tu vida",
        hero_subtitle: "12 clinicas ambulatorias en EE. UU. y Reino Unido con atencion bilingue.",
        cta_btn: "Solicitar una cita",
        services_title: "Nuestros Servicios",
        s1_title: "Atencion Primaria",
        s1_desc: "Manejo de enfermedades cronicas como diabetes, hipertension y asma.",
        s2_title: "Especialistas",
        s2_desc: "Cardiologia, endocrinologia, neumologia y salud femenina dentro de nuestra red.",
        s3_title: "Salud Preventiva",
        s3_desc: "Chequeos, vacunacion y apoyo de salud mental para tu bienestar.",
        loc_title: "Ubicaciones en EE. UU.",
        th_name: "Nombre de Clinica",
        th_city: "Ciudad",
        th_phone: "Telefono",
        th_hours: "Horario",
        h_austin_c: "Lun-Vie 7am-8pm | Sab 9am-3pm",
        h_austin_n: "Lun-Vie 8am-7pm",
        h_sa: "Lun-Vie 8am-6pm | Sab 9am-1pm",
        h_miami: "Lun-Vie 7am-8pm | Sab 9am-4pm",
        h_atl: "Lun-Vie 8am-7pm",
        footer_rights: "Todos los derechos reservados.",
        footer_contact: "Contacto",
        footer_social: "Siguenos",
        form_title: "Consulta de Paciente",
        form_subtitle: "Completa la informacion para solicitar una llamada.",
        l_fname: "Nombre",
        l_lname: "Apellido",
        l_dob: "Fecha de Nacimiento",
        l_phone: "Telefono (+Codigo de Pais)",
        l_service: "Servicio Requerido",
        l_clinic: "Clinica Preferida",
        l_insurance_q: "Tienes seguro medico?",
        v_yes: "Si",
        v_no: "No",
        l_concern: "Motivo de consulta",
        l_consent: "Acepto que HealthCore me contacte para confirmar la cita.",
        partner_note: "Eres proveedor de salud u organizacion? Contacta a partnerships@healthcore.com",
        success_h: "Consulta enviada con exito",
        success_p: "Hemos recibido tu consulta. Un miembro del equipo te contactara en 1 dia habil.",
        back_home: "Volver al inicio",
        submit_btn: "Enviar Consulta",
        opt_select: "Selecciona...",
        opt_primary: "Atencion Primaria",
        opt_chronic: "Manejo de Enfermedad Cronica",
        opt_paediatric: "Atencion Pediatrica",
        opt_specialist: "Consulta con Especialista",
        ph_provider: "Nombre de Aseguradora",
        ph_mid: "ID de Afiliado",
        err_name: "El nombre debe contener solo letras y al menos 2 caracteres.",
        err_phone: "Ingresa un telefono valido con codigo de pais.",
        err_paediatric: "La atencion pediatrica esta disponible solo para menores de 18 anos.",
        warn_evening: "Aviso: Esta clinica cierra a las 6:00 PM o antes. El horario nocturno podria no estar disponible."
    }
};

function getStoredLang() {
    try {
        return localStorage.getItem("lang") || "en";
    } catch (error) {
        return "en";
    }
}

function setStoredLang(lang) {
    try {
        localStorage.setItem("lang", lang);
    } catch (error) {
        // localStorage can be blocked in some browser/privacy contexts.
    }
}

let currentLang = getStoredLang();

function toggleLanguage() {
    currentLang = currentLang === "en" ? "es" : "en";
    setStoredLang(currentLang);
    applyTranslations();
}

function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const key = el.getAttribute("data-i18n-ph");
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.setAttribute("placeholder", i18n[currentLang][key]);
        }
    });

    const switcher = document.getElementById("langSwitcher");
    if (switcher) {
        switcher.textContent = currentLang === "en" ? "ES" : "EN";
    }

    const switcherMobile = document.getElementById("langSwitcherMobile");
    if (switcherMobile) {
        switcherMobile.textContent = currentLang === "en" ? "ES" : "EN";
    }
}

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age -= 1;
    }

    return age;
}

function setupForm() {
    const form = document.getElementById("appointmentForm");
    if (!form) {
        return;
    }

    const concern = document.getElementById("concernText");
    const counter = document.getElementById("charCounter");
    const dobInput = document.getElementById("dobInput");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phoneInput");
    const firstNameError = document.getElementById("err_first_name");
    const lastNameError = document.getElementById("err_last_name");
    const phoneError = document.getElementById("err_phone");
    const notice = document.getElementById("formNotice");

    if (dobInput) {
        dobInput.setAttribute("max", new Date().toISOString().split("T")[0]);
    }

    if (concern && counter) {
        concern.addEventListener("input", () => {
            counter.textContent = `${concern.value.length} / 500`;
        });
    }

    const nameRegex = /^[A-Za-z][A-Za-z' -]{1,}$/;
    const phoneRegex = /^\+?[0-9][0-9\s()-]{7,}$/;

    const showError = (el, visible) => {
        if (!el) {
            return;
        }
        el.classList.toggle("hidden", !visible);
    };

    form.addEventListener("change", (e) => {
        if (e.target && e.target.name === "has_insurance") {
            const insuranceSection = document.getElementById("insuranceSection");
            if (insuranceSection) {
                insuranceSection.classList.toggle("hidden", e.target.value === "No");
            }
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (notice) {
            notice.classList.add("hidden");
            notice.textContent = "";
        }

        const data = new FormData(form);
        const dobValue = data.get("date_of_birth");
        const service = data.get("service_type");
        const clinic = data.get("preferred_clinic");
        const firstName = String(data.get("first_name") || "").trim();
        const lastName = String(data.get("last_name") || "").trim();
        const phone = String(data.get("phone") || "").trim();

        const validFirst = nameRegex.test(firstName);
        const validLast = nameRegex.test(lastName);
        const validPhone = phoneRegex.test(phone);

        showError(firstNameError, !validFirst);
        showError(lastNameError, !validLast);
        showError(phoneError, !validPhone);

        if (!validFirst && firstNameInput) {
            firstNameInput.focus();
            return;
        }
        if (!validLast && lastNameInput) {
            lastNameInput.focus();
            return;
        }
        if (!validPhone && phoneInput) {
            phoneInput.focus();
            return;
        }

        if (!dobValue) {
            return;
        }

        const dob = new Date(String(dobValue));
        const age = calculateAge(dob);

        if (service === "Paediatric Care" && age >= 18) {
            if (notice) {
                notice.textContent = i18n[currentLang].err_paediatric;
                notice.classList.remove("hidden");
            }
            return;
        }

        if (clinic === "HealthCore San Antonio") {
            if (notice) {
                notice.textContent = i18n[currentLang].warn_evening;
                notice.classList.remove("hidden");
            }
        }

        form.classList.add("hidden");
        const success = document.getElementById("successMsg");
        if (success) {
            success.classList.remove("hidden");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
    setupForm();
});
