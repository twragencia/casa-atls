// 🔧 CONFIGURAÇÕES — personalize antes de publicar
const WHATSAPP_NUMBER = '5551998440879'; // Coloque o número com DDI+DDD, ex.: '5551999999999'
const ORIGEM = 'LP Atlântida Sul Ref A113';
const PRECO = 'R$ 372.000';
const PRECOPOR = 'R$ 349.000';

// Mensagem base enviada pelo WhatsApp
function getWaMessage() {
	const url = window.location.href;
	const params = new URLSearchParams(window.location.search);
	const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
			.map(k => params.get(k) ? `${k}:${params.get(k)}` : null)
			.filter(Boolean)
			.join(' | ');

	const msg = `Olá! Tenho interesse na casa Ref. A113 em Atlântida Sul.\n\nPoderia me enviar mais detalhes e agendar uma visita?\n\nPreço anunciado: de ${PRECO}\nOrigem: ${ORIGEM}${utm ? `\nUTM: ${utm}` : ''}\nPágina: ${url}`;
	return encodeURIComponent(msg);
}

function buildWaLink() {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${getWaMessage()}`;
}

// Aplica link em todos os CTAs
function wireWhatsAppCTAs() {
	const ids = ['whatsapp-top', 'whatsapp-hero', 'whatsapp-lifestyle', 'whatsapp-features', 'whatsapp-gallery', 'whatsapp-location', 'whatsapp-finance', 'whatsapp-final'];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (el)
			el.setAttribute('href', buildWaLink());
	});
}

// Conversão Facebook Pixel (Contact) — segura caso o pixel não carregue
function trackContact() {
	try {
		if (window.fbq)
			window.fbq('track', 'Contact');
	} catch (e) {
	}
}

// Evento no clique dos botões
function bindTracking() {
	const buttons = document.querySelectorAll('[id^="whatsapp-"]');
	buttons.forEach(btn => btn.addEventListener('click', trackContact));
}

document.addEventListener('DOMContentLoaded', () => {
	wireWhatsAppCTAs();
	bindTracking();
});

