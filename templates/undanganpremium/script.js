const SUPABASE_URL = "https://puvgcnopzxvutbcavhur.supabase.co";
const SUPABASE_KEY = "API_KEY_KAMU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
function openInvite() {
  document.getElementById("opening").style.display = "none";
  document.getElementById("content").style.display = "block";

  document.getElementById("musik").play();
}

async function loadUndangan() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("t");

  if (!slug) return;

  // ambil data tamu
  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("slug_url", slug)
    .single();

  if (!guest) {
    alert("Tamu tidak ditemukan");
    return;
  }

  // ambil data acara
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id_event", guest.id_event)
    .single();

  // tampilkan data
  document.getElementById("guestName").innerText = guest.nama_tamu;
  document.getElementById("coupleName").innerText = event.nama_acara;

  // generate QR
  QRCode.toCanvas(document.getElementById("qrcode"), guest.id_tamu);
}

// COUNTDOWN
const targetDate = new Date("Dec 12, 2026 08:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = targetDate - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((gap % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML =
    d + " Hari " + h + " Jam " + m + " Menit " + s + " Detik";
}, 1000);
loadUndangan();