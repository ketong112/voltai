// VoltAI — demo engine.
//
// Deterministic rule-based local analyser, used ONLY while no real Firebase
// config is present (demo mode). Every demo result is badged DEMO and the app
// shows a demo banner; never presented as AI. The content below is written
// by a real house electrician's playbook: realistic causes, steps, tools and
// Indonesian prices. Prices are rough 2026 estimates for Medan, Indonesia.

import type { AnalysisResult, Lang } from "./types.js";

interface MockEntry {
  key: string;
  keywords: string[];
  en: AnalysisResult;
  id: AnalysisResult;
}

const ENTRIES: MockEntry[] = [
  {
    key: "mcb-tripping",
    keywords: [
      "mcb", "trip", "jeglek", "circuit breaker", "breaker",
      "mati mendadak", "listrik mati", "turun", "anjlok",
    ],
    en: {
      diagnosis: [
        {
          cause: "Overload — too many appliances on one circuit",
          likelihood: "High",
          explanation:
            "The most common cause. When the total load passes the MCB rating (often 6A or 10A on a lighting circuit), the breaker trips to protect the wiring.",
        },
        {
          cause: "Short circuit in a device or socket",
          likelihood: "Medium",
          explanation:
            "A faulty appliance, damaged plug, or pinched wire creates a direct live-to-neutral path. The MCB trips instantly, often with a small spark or pop sound.",
        },
        {
          cause: "Weak or worn-out MCB",
          likelihood: "Medium",
          explanation:
            "An old MCB can trip below its rated current. If it trips even with almost nothing plugged in, the breaker itself is the prime suspect.",
        },
      ],
      fixSteps: [
        {
          cause: "Overload — too many appliances on one circuit",
          difficulty: "Easy",
          tools: ["None", "A calculator or the load list on each appliance"],
          steps: [
            "Turn the MCB back on and unplug everything on that circuit.",
            "Switch the MCB on, then plug appliances back one by one.",
            "Note which appliance makes it trip — that one pushes the circuit over its limit.",
            "Move the heavy appliance (rice cooker, water heater, AC) to a different circuit, or run heavy appliances one at a time.",
            "If the circuit is still too small for the house, an electrician can split it into two circuits.",
          ],
        },
        {
          cause: "Short circuit in a device or socket",
          difficulty: "Medium",
          tools: ["Test pen", "Screwdriver (insulated)", "Spare plug or socket"],
          steps: [
            "Turn OFF the MCB for that circuit and confirm it is dead with a test pen.",
            "Unplug every device on the circuit, then turn the MCB back on.",
            "If it holds, plug devices back one by one until it trips — that device is faulty.",
            "Check the faulty device's plug and cable for burnt marks, melted plastic, or exposed copper.",
            "Replace the damaged plug or cable. If the socket itself is burnt, replace the socket.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 35000,
        partsHigh: 120000,
        laborLow: 0,
        laborHigh: 200000,
        notes:
          "A new MCB 6A-16A costs Rp 35.000-120.000. Splitting a circuit needs extra NYM cable (Rp 8.000-15.000/m) plus labour. If an electrician comes, expect Rp 100.000-200.000 for a visit and MCB replacement.",
      },
      safetyChecklist: [
        "Turn off the MCB before touching any socket, plug, or wire.",
        "Test that the circuit is dead with a test pen before starting work.",
        "Use insulated screwdrivers; never use bare metal tools on wiring.",
        "Keep hands and floor dry — never work on wiring with wet hands.",
        "If you see burnt marks or smell burning, stop and call an electrician.",
        "Never replace an MCB with a higher rating to 'stop the tripping' — the wiring can overheat and catch fire.",
      ],
      callAPro: {
        when: [
          "The MCB trips again immediately after you reset it with everything unplugged.",
          "You see sparks, smoke, or a burning smell at the panel or a socket.",
          "The MCB or the panel feels hot to the touch.",
          "The wiring inside the panel looks burnt, melted, or corroded.",
        ],
        why: "A breaker that trips with no load, or any heat, sparking, or burning at the panel, means a fault in the fixed wiring. That is a fire risk and only a licensed electrician should open the panel.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "Beban berlebih — terlalu banyak alat di satu sirkuit",
          likelihood: "High",
          explanation:
            "Penyebab paling umum. Kalau total beban melewati rating MCB (biasanya 6A atau 10A di sirkuit lampu), MCB akan trip untuk melindungi kabel.",
        },
        {
          cause: "Korsleting di alat atau stopkontak",
          likelihood: "Medium",
          explanation:
            "Alat rusak, steker rusak, atau kabel terjepit membuat jalur langsung fase ke netral. MCB langsung trip, sering disertai percikan atau bunyi 'tek'.",
        },
        {
          cause: "MCB sudah lemah atau aus",
          likelihood: "Medium",
          explanation:
            "MCB tua bisa trip di bawah arus ratingnya. Kalau MCB trip padahal hampir tidak ada beban, MCB-nya sendiri yang patut dicurigai.",
        },
      ],
      fixSteps: [
        {
          cause: "Beban berlebih — terlalu banyak alat di satu sirkuit",
          difficulty: "Easy",
          tools: ["Tidak ada", "Kalkulator atau label daya di tiap alat"],
          steps: [
            "Naikkan kembali MCB, lalu cabut semua alat di sirkuit itu.",
            "Nyalakan MCB, lalu colokkan alat satu per satu.",
            "Perhatikan alat mana yang membuat MCB trip — alat itu yang membuat beban berlebih.",
            "Pindahkan alat berat (rice cooker, pemanas air, AC) ke sirkuit lain, atau nyalakan alat berat satu per satu.",
            "Kalau sirkuit tetap kekecilan, tukang listrik bisa memecahnya jadi dua sirkuit.",
          ],
        },
        {
          cause: "Korsleting di alat atau stopkontak",
          difficulty: "Medium",
          tools: ["Tespen", "Obeng (berisolasi)", "Steker atau stopkontak cadangan"],
          steps: [
            "Matikan MCB sirkuit itu dan pastikan tidak ada arus dengan tespen.",
            "Cabut semua alat di sirkuit, lalu naikkan kembali MCB.",
            "Kalau MCB bertahan, colokkan alat satu per satu sampai trip — alat itu yang rusak.",
            "Periksa steker dan kabel alat yang rusak: ada bekas gosong, plastik meleleh, atau tembaga terbuka.",
            "Ganti steker atau kabel yang rusak. Kalau stopkontaknya gosong, ganti stopkontaknya.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 35000,
        partsHigh: 120000,
        laborLow: 0,
        laborHigh: 200000,
        notes:
          "MCB baru 6A-16A harganya Rp 35.000-120.000. Pecah sirkuit butuh kabel NYM tambahan (Rp 8.000-15.000/m) plus ongkos kerja. Kalau panggil tukang listrik, siapkan Rp 100.000-200.000 untuk kunjungan dan ganti MCB.",
      },
      safetyChecklist: [
        "Matikan MCB sebelum menyentuh stopkontak, steker, atau kabel apa pun.",
        "Pastikan sirkuit benar-benar mati dengan tespen sebelum mulai bekerja.",
        "Gunakan obeng berisolasi; jangan pakai alat logam telanjang pada kabel.",
        "Tangan dan lantai harus kering — jangan kerjakan kabel dengan tangan basah.",
        "Kalau ada bekas gosong atau bau terbakar, berhenti dan panggil tukang listrik.",
        "Jangan pernah ganti MCB dengan rating lebih besar supaya 'tidak trip lagi' — kabel bisa panas berlebih dan terbakar.",
      ],
      callAPro: {
        when: [
          "MCB langsung trip lagi begitu dinaikkan, padahal semua alat sudah dicabut.",
          "Ada percikan api, asap, atau bau gosong di panel atau stopkontak.",
          "MCB atau panel terasa panas saat disentuh.",
          "Kabel di dalam panel terlihat gosong, meleleh, atau berkarat.",
        ],
        why: "MCB yang trip tanpa beban, atau ada panas, percikan, dan bau gosong di panel, berarti ada kerusakan pada instalasi tetap. Itu risiko kebakaran dan hanya tukang listrik berlisensi yang boleh membuka panel.",
      },
    },
  },
  {
    key: "flickering-lights",
    keywords: [
      "flicker", "berkedip", "kedip", "lampu redup", "dim", "berkedut",
      "light flickers", "lampu berkedip",
    ],
    en: {
      diagnosis: [
        {
          cause: "Loose bulb or loose lamp holder connection",
          likelihood: "High",
          explanation:
            "The most common cause. A bulb that is not screwed in tightly, or a worn lamp holder, makes intermittent contact — the light flickers, especially when the fitting is touched or vibrated.",
        },
        {
          cause: "Loose neutral wire in the circuit",
          likelihood: "Medium",
          explanation:
            "A loose neutral connection at a junction box, switch, or the panel makes voltage unstable. Several lights on the same circuit flicker together, and it often gets worse when a big appliance starts.",
        },
        {
          cause: "Failing LED driver or cheap bulb",
          likelihood: "Medium",
          explanation:
            "Low-quality LED bulbs and their drivers flicker as they age, especially on dimmers they were not designed for. The flicker is usually in one lamp only.",
        },
      ],
      fixSteps: [
        {
          cause: "Loose bulb or loose lamp holder connection",
          difficulty: "Easy",
          tools: ["Replacement bulb", "Dry cloth"],
          steps: [
            "Turn off the light switch and let the bulb cool down.",
            "Unscrew the bulb, wipe the contacts, and screw it back in firmly.",
            "If it still flickers, try a known-good bulb in the same fitting.",
            "If the new bulb is steady, the old bulb is faulty — replace it.",
            "If the holder feels loose or wobbly, the fitting needs replacing.",
          ],
        },
        {
          cause: "Loose neutral wire in the circuit",
          difficulty: "Hard",
          tools: ["Test pen", "Insulated screwdriver", "Wire connectors"],
          steps: [
            "Turn off the MCB for the lighting circuit and confirm it is dead.",
            "Open the flickering lamp's fitting and check that the neutral wire is tight in its terminal.",
            "Check the junction box feeding that circuit for loose wire nuts or terminals.",
            "Tighten every loose terminal. Replace any connector that is burnt or melted.",
            "Restore power and watch the lights for a few minutes before closing everything up.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 100000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "A quality LED bulb costs Rp 25.000-100.000; a new lamp fitting Rp 15.000-50.000. Tracing a loose neutral takes an electrician 1-2 hours, around Rp 100.000-150.000.",
      },
      safetyChecklist: [
        "Turn off the switch — and the MCB if you open any fitting — before touching wires.",
        "Let the bulb cool before handling it; LED and halogen bulbs get hot.",
        "Never work on wiring with wet hands or on a wet floor.",
        "Use insulated tools and a test pen to confirm the circuit is dead.",
        "If several lights flicker together, treat it as a wiring fault, not a bulb fault.",
      ],
      callAPro: {
        when: [
          "Several lights on different rooms flicker at the same time.",
          "The flicker comes with a buzzing sound from the panel or a switch.",
          "Lights dim sharply every time a big appliance (AC, water pump) starts.",
          "You find burnt or melted wire connectors in a junction box.",
        ],
        why: "Flicker across many lights points to a loose neutral or a panel fault, which can damage appliances and start a fire. That needs proper tracing tools and a licensed electrician.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "Bohlam longgar atau koneksi fitting lampu kendor",
          likelihood: "High",
          explanation:
            "Penyebab paling umum. Bohlam yang kurang kencang, atau fitting yang sudah aus, membuat kontak putus-nyambung — lampu berkedip, apalagi kalau fitting tersentuh atau bergetar.",
        },
        {
          cause: "Kabel netral kendor di sirkuit",
          likelihood: "Medium",
          explanation:
            "Koneksi netral yang kendor di kotak sambung, saklar, atau panel membuat tegangan tidak stabil. Beberapa lampu di sirkuit yang sama berkedip bersamaan, dan makin parah saat alat besar menyala.",
        },
        {
          cause: "Driver LED rusak atau bohlam murahan",
          likelihood: "Medium",
          explanation:
            "Bohlam LED murahan dan driver-nya berkedip saat sudah tua, apalagi di dimmer yang tidak cocok. Kedipnya biasanya hanya di satu lampu.",
        },
      ],
      fixSteps: [
        {
          cause: "Bohlam longgar atau koneksi fitting lampu kendor",
          difficulty: "Easy",
          tools: ["Bohlam pengganti", "Kain kering"],
          steps: [
            "Matikan saklar lampu dan biarkan bohlam dingin dulu.",
            "Lepas bohlam, lap kontaknya, lalu pasang kembali dengan kencang.",
            "Kalau masih berkedip, coba bohlam lain yang sudah pasti bagus di fitting yang sama.",
            "Kalau bohlam baru stabil, bohlam lama rusak — ganti saja.",
            "Kalau fitting terasa longgar atau goyang, fittingnya perlu diganti.",
          ],
        },
        {
          cause: "Kabel netral kendor di sirkuit",
          difficulty: "Hard",
          tools: ["Tespen", "Obeng berisolasi", "Konektor kabel"],
          steps: [
            "Matikan MCB sirkuit lampu dan pastikan tidak ada arus.",
            "Buka fitting lampu yang berkedip dan periksa kabel netral sudah kencang di terminalnya.",
            "Periksa kotak sambung yang memberi sirkuit itu — ada sambungan kendor atau terminal longgar.",
            "Kencangkan semua terminal yang longgar. Ganti konektor yang gosong atau meleleh.",
            "Nyalakan lagi dan perhatikan lampu beberapa menit sebelum menutup semuanya.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 100000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "Bohlam LED berkualitas Rp 25.000-100.000; fitting lampu baru Rp 15.000-50.000. Melacak netral kendor butuh tukang listrik 1-2 jam, sekitar Rp 100.000-150.000.",
      },
      safetyChecklist: [
        "Matikan saklar — dan MCB kalau membuka fitting — sebelum menyentuh kabel.",
        "Biarkan bohlam dingin sebelum dipegang; bohlam LED dan halogen panas.",
        "Jangan kerjakan kabel dengan tangan basah atau lantai basah.",
        "Pakai alat berisolasi dan tespen untuk memastikan sirkuit mati.",
        "Kalau beberapa lampu berkedip bersamaan, anggap itu kerusakan kabel, bukan bohlam.",
      ],
      callAPro: {
        when: [
          "Beberapa lampu di ruangan berbeda berkedip bersamaan.",
          "Kedipan disertai bunyi dengung dari panel atau saklar.",
          "Lampu meredup tajam setiap kali alat besar (AC, pompa air) menyala.",
          "Ada konektor kabel gosong atau meleleh di kotak sambung.",
        ],
        why: "Kedipan di banyak lampu menandakan netral kendor atau kerusakan panel, yang bisa merusak alat elektronik dan memicu kebakaran. Itu butuh alat pelacak dan tukang listrik berlisensi.",
      },
    },
  },
  {
    key: "dead-outlet",
    keywords: [
      "outlet", "stopkontak", "socket", "no power", "tidak ada listrik",
      "colokan mati", "stop kontak", "dead socket",
    ],
    en: {
      diagnosis: [
        {
          cause: "Tripped MCB or blown fuse for that circuit",
          likelihood: "High",
          explanation:
            "One dead outlet while the rest of the house works almost always means its circuit breaker tripped. Check the panel first — it is the quickest fix.",
        },
        {
          cause: "Loose or burnt wire inside the socket",
          likelihood: "Medium",
          explanation:
            "Sockets that run heaters or rice cookers heat up over time. The wire terminal loosens or burns, and the socket goes dead while the breaker stays on.",
        },
        {
          cause: "Faulty socket mechanism (worn contacts)",
          likelihood: "Medium",
          explanation:
            "Old sockets lose their grip. The plug feels loose, the connection is intermittent, and eventually nothing works even though power reaches the box.",
        },
      ],
      fixSteps: [
        {
          cause: "Tripped MCB or blown fuse for that circuit",
          difficulty: "Easy",
          tools: ["None"],
          steps: [
            "Open the panel and look for an MCB in the down (OFF) position.",
            "Unplug everything on that circuit, then push the MCB fully down and back up.",
            "If it stays on, plug devices back one by one to find the one that tripped it.",
            "If it trips again with nothing plugged in, the fault is in the fixed wiring.",
          ],
        },
        {
          cause: "Loose or burnt wire inside the socket",
          difficulty: "Medium",
          tools: ["Test pen", "Insulated screwdriver", "Replacement socket"],
          steps: [
            "Turn off the MCB for that circuit and confirm it is dead with a test pen.",
            "Unscrew the socket faceplate and pull the socket out of the wall box.",
            "Look for burnt, melted, or loose wire terminals.",
            "If the wires are sound, tighten the terminals and refit. If the socket is burnt, replace it with a new one of the same type.",
            "Restore power and test with a small appliance before using it for heavy loads.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 80000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "A good quality socket costs Rp 25.000-80.000. If an electrician replaces it, expect Rp 100.000-150.000 including the visit. A burnt wall box or damaged cable costs more.",
      },
      safetyChecklist: [
        "Always turn off the MCB for the circuit before opening a socket.",
        "Confirm the socket is dead with a test pen — never trust the switch alone.",
        "Do not use a socket with burnt marks, cracks, or a loose plug fit.",
        "Never plug a heavy appliance into a socket that already feels warm.",
        "Keep the work area dry and use insulated tools.",
      ],
      callAPro: {
        when: [
          "The MCB trips again with nothing plugged into the socket.",
          "The wires inside the wall box are burnt, melted, or too short to work with.",
          "More than one socket on the same circuit is dead.",
          "You smell burning or see scorch marks around the socket.",
        ],
        why: "A dead circuit with no load, or burnt wiring inside the wall, means the fault is in the fixed installation. Opening a wall box with damaged cable is a shock and fire risk — leave it to a licensed electrician.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "MCB trip atau sekring putus di sirkuit itu",
          likelihood: "High",
          explanation:
            "Satu stopkontak mati sementara rumah lain normal hampir pasti karena MCB sirkuitnya trip. Periksa panel dulu — itu perbaikan paling cepat.",
        },
        {
          cause: "Kabel kendor atau gosong di dalam stopkontak",
          likelihood: "Medium",
          explanation:
            "Stopkontak yang dipakai untuk pemanas atau rice cooker memanas dari waktu ke waktu. Terminal kabel mengendor atau gosong, dan stopkontak mati padahal MCB tetap nyala.",
        },
        {
          cause: "Mekanisme stopkontak rusak (kontak aus)",
          likelihood: "Medium",
          explanation:
            "Stopkontak tua kehilangan jepitannya. Steker terasa longgar, koneksi putus-nyambung, dan akhirnya tidak berfungsi walau listrik sampai ke kotak.",
        },
      ],
      fixSteps: [
        {
          cause: "MCB trip atau sekring putus di sirkuit itu",
          difficulty: "Easy",
          tools: ["Tidak ada"],
          steps: [
            "Buka panel dan cari MCB yang posisinya turun (OFF).",
            "Cabut semua alat di sirkuit itu, lalu dorong MCB sampai bawah lalu naikkan kembali.",
            "Kalau MCB bertahan, colokkan alat satu per satu untuk mencari yang membuat trip.",
            "Kalau trip lagi padahal tidak ada yang tercolok, kerusakannya ada di instalasi tetap.",
          ],
        },
        {
          cause: "Kabel kendor atau gosong di dalam stopkontak",
          difficulty: "Medium",
          tools: ["Tespen", "Obeng berisolasi", "Stopkontak pengganti"],
          steps: [
            "Matikan MCB sirkuit itu dan pastikan tidak ada arus dengan tespen.",
            "Lepas pelat stopkontak dan tarik stopkontak keluar dari kotak dinding.",
            "Periksa terminal kabel: ada yang gosong, meleleh, atau kendor.",
            "Kalau kabel masih bagus, kencangkan terminal dan pasang kembali. Kalau stopkontak gosong, ganti dengan yang baru sejenis.",
            "Nyalakan lagi dan tes dengan alat kecil sebelum dipakai untuk beban berat.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 80000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "Stopkontak berkualitas bagus Rp 25.000-80.000. Kalau diganti tukang listrik, siapkan Rp 100.000-150.000 termasuk kunjungan. Kotak dinding gosong atau kabel rusak biayanya lebih besar.",
      },
      safetyChecklist: [
        "Selalu matikan MCB sirkuit itu sebelum membuka stopkontak.",
        "Pastikan stopkontak mati dengan tespen — jangan percaya saklar saja.",
        "Jangan pakai stopkontak yang ada bekas gosong, retak, atau steker longgar.",
        "Jangan colokkan alat berat ke stopkontak yang sudah terasa hangat.",
        "Area kerja harus kering dan pakai alat berisolasi.",
      ],
      callAPro: {
        when: [
          "MCB trip lagi padahal tidak ada yang tercolok di stopkontak.",
          "Kabel di dalam kotak dinding gosong, meleleh, atau terlalu pendek untuk dikerjakan.",
          "Lebih dari satu stopkontak di sirkuit yang sama mati.",
          "Ada bau gosong atau bekas hangus di sekitar stopkontak.",
        ],
        why: "Sirkuit mati tanpa beban, atau kabel gosong di dalam dinding, berarti kerusakannya ada di instalasi tetap. Membuka kotak dinding dengan kabel rusak berisiko sengatan dan kebakaran — serahkan ke tukang listrik berlisensi.",
      },
    },
  },
  {
    key: "burning-smell",
    keywords: [
      "burning", "gosong", "bau terbakar", "smell", "smoke", "asap",
      "hangus", "hot socket", "panas", "melted", "meleleh",
    ],
    en: {
      diagnosis: [
        {
          cause: "Overheated socket or plug from a loose connection",
          likelihood: "High",
          explanation:
            "A loose terminal or a plug that does not fit tightly creates resistance, and resistance creates heat. The plastic starts to smell, discolour, and eventually melt. This is the most common source of a burning smell.",
        },
        {
          cause: "Overloaded socket or extension cord",
          likelihood: "High",
          explanation:
            "Running a heater, rice cooker, or water dispenser through one socket — or a thin extension cord — for a long time overheats the contacts and the cable.",
        },
        {
          cause: "Damaged cable insulation inside the wall",
          likelihood: "Medium",
          explanation:
            "Old or rodent-damaged cable can short inside the wall. The smell comes through the socket or switch box, and the wall may feel warm.",
        },
      ],
      fixSteps: [
        {
          cause: "Overheated socket or plug from a loose connection",
          difficulty: "Medium",
          tools: ["Test pen", "Insulated screwdriver", "Replacement socket"],
          steps: [
            "Turn off the MCB for that circuit IMMEDIATELY and unplug everything from the socket.",
            "Do not use that socket again until it is fixed.",
            "Once the circuit is dead, open the socket and inspect the terminals for melting or blackening.",
            "Replace the damaged socket. Tighten the terminals firmly on the new one.",
            "If the cable ends are burnt, cut back to clean copper before reconnecting.",
          ],
        },
        {
          cause: "Overloaded socket or extension cord",
          difficulty: "Easy",
          tools: ["None"],
          steps: [
            "Turn off the MCB and unplug the heavy appliance.",
            "Stop using thin extension cords for heaters, rice cookers, and water dispensers.",
            "Plug heavy appliances directly into a wall socket, one per socket.",
            "If one room keeps needing more sockets, ask an electrician to add a new circuit.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 150000,
        laborLow: 100000,
        laborHigh: 300000,
        notes:
          "A replacement socket is Rp 25.000-80.000. If cable inside the wall must be replaced, parts and labour run Rp 150.000-300.000 depending on length. Do not delay this repair — a burning smell is always urgent.",
      },
      safetyChecklist: [
        "Turn off the MCB for the circuit immediately — do not wait.",
        "Unplug everything from the affected socket.",
        "Do NOT touch a socket or plug that is hot, smoking, or melting.",
        "Do not switch the MCB back on until the socket has been inspected.",
        "If you see smoke or flame, leave the room and call the fire service (113) — do not use water on an electrical fire.",
        "Keep a dry-powder fire extinguisher accessible near the panel if possible.",
      ],
      callAPro: {
        when: [
          "The burning smell continues after you turn off the MCB.",
          "You see smoke, flame, or melted plastic.",
          "The wall around the socket feels warm.",
          "The smell comes from inside the wall or the panel, not from one socket.",
        ],
        why: "A burning smell means something is already overheating. If the source is inside the wall or the panel, the fault is hidden and the fire risk is real. This is an emergency — call a licensed electrician right away, and the fire service if there is smoke or flame.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "Stopkontak atau steker panas berlebih karena koneksi longgar",
          likelihood: "High",
          explanation:
            "Terminal longgar atau steker yang tidak pas menimbulkan hambatan, dan hambatan menimbulkan panas. Plastik mulai berbau, berubah warna, lalu meleleh. Ini sumber bau gosong paling umum.",
        },
        {
          cause: "Stopkontak atau kabel ekstensi kelebihan beban",
          likelihood: "High",
          explanation:
            "Menjalankan pemanas, rice cooker, atau dispenser lewat satu stopkontak — atau kabel ekstensi tipis — dalam waktu lama membuat kontak dan kabel panas berlebih.",
        },
        {
          cause: "Isolasi kabel rusak di dalam dinding",
          likelihood: "Medium",
          explanation:
            "Kabel tua atau digigit tikus bisa korslet di dalam dinding. Baunya keluar lewat stopkontak atau kotak saklar, dan dinding bisa terasa hangat.",
        },
      ],
      fixSteps: [
        {
          cause: "Stopkontak atau steker panas berlebih karena koneksi longgar",
          difficulty: "Medium",
          tools: ["Tespen", "Obeng berisolasi", "Stopkontak pengganti"],
          steps: [
            "Matikan MCB sirkuit itu SEGERA dan cabut semua yang tercolok di stopkontak.",
            "Jangan pakai stopkontak itu lagi sampai diperbaiki.",
            "Setelah sirkuit mati, buka stopkontak dan periksa terminal ada yang meleleh atau menghitam.",
            "Ganti stopkontak yang rusak. Kencangkan terminal dengan kuat pada yang baru.",
            "Kalau ujung kabel gosong, potong sampai tembaga bersih sebelum disambung lagi.",
          ],
        },
        {
          cause: "Stopkontak atau kabel ekstensi kelebihan beban",
          difficulty: "Easy",
          tools: ["Tidak ada"],
          steps: [
            "Matikan MCB dan cabut alat beratnya.",
            "Berhenti memakai kabel ekstensi tipis untuk pemanas, rice cooker, dan dispenser.",
            "Colokkan alat berat langsung ke stopkontak dinding, satu alat satu stopkontak.",
            "Kalau satu ruangan terus kekurangan stopkontak, minta tukang listrik menambah sirkuit baru.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 25000,
        partsHigh: 150000,
        laborLow: 100000,
        laborHigh: 300000,
        notes:
          "Stopkontak pengganti Rp 25.000-80.000. Kalau kabel di dalam dinding harus diganti, biaya Rp 150.000-300.000 tergantung panjangnya. Jangan tunda perbaikan ini — bau gosong selalu darurat.",
      },
      safetyChecklist: [
        "Matikan MCB sirkuit itu segera — jangan menunggu.",
        "Cabut semua yang tercolok di stopkontak tersebut.",
        "JANGAN sentuh stopkontak atau steker yang panas, berasap, atau meleleh.",
        "Jangan nyalakan MCB lagi sebelum stopkontak diperiksa.",
        "Kalau ada asap atau api, keluar dari ruangan dan hubungi pemadam kebakaran (113) — jangan siram api listrik dengan air.",
        "Sediakan APAR serbuk kering di dekat panel kalau memungkinkan.",
      ],
      callAPro: {
        when: [
          "Bau gosong tetap ada setelah MCB dimatikan.",
          "Ada asap, api, atau plastik meleleh.",
          "Dinding di sekitar stopkontak terasa hangat.",
          "Bau berasal dari dalam dinding atau panel, bukan dari satu stopkontak.",
        ],
        why: "Bau gosong berarti ada yang sudah panas berlebih. Kalau sumbernya di dalam dinding atau panel, kerusakannya tersembunyi dan risiko kebakaran nyata. Ini darurat — segera panggil tukang listrik berlisensi, dan pemadam kebakaran kalau ada asap atau api.",
      },
    },
  },
  {
    key: "high-bill",
    keywords: [
      "bill", "tagihan", "mahal", "membengkak", "expensive", "high usage",
      "kwh", "token", "pulsa listrik", "boros",
    ],
    en: {
      diagnosis: [
        {
          cause: "A high-power appliance running longer than you think",
          likelihood: "High",
          explanation:
            "Water heaters, AC units, old refrigerators, and water pumps are the usual suspects. A water heater left on 24 hours, or an AC set very cold, can double a bill without any fault at all.",
        },
        {
          cause: "Old or faulty appliance drawing excess current",
          likelihood: "Medium",
          explanation:
            "An ageing refrigerator with worn door seals, a pump that cycles constantly, or a fan with dry bearings draws far more power than its label says.",
        },
        {
          cause: "Current leakage or an unauthorised tap on your line",
          likelihood: "Low",
          explanation:
            "Rare, but real: damaged cable leaking current to earth, or someone tapping your supply. Suspect this only if usage jumps with no change in habits and the meter spins with everything off.",
        },
      ],
      fixSteps: [
        {
          cause: "A high-power appliance running longer than you think",
          difficulty: "Easy",
          tools: ["Your electricity meter or token meter", "A plug-in power meter (optional)"],
          steps: [
            "List every appliance and its wattage (printed on the label).",
            "Turn off everything, then switch appliances on one at a time and watch the meter speed.",
            "The appliance that makes the meter spin fastest is your biggest cost.",
            "Use the water heater only when needed, set the AC to 24-25°C, and switch off standby loads at night.",
            "Consider a plug-in power meter (Rp 100.000-200.000) to measure the real consumption of each appliance.",
          ],
        },
        {
          cause: "Old or faulty appliance drawing excess current",
          difficulty: "Medium",
          tools: ["Plug-in power meter", "Screwdriver"],
          steps: [
            "Measure each suspect appliance with a plug-in power meter for 24 hours.",
            "Check refrigerator door seals: close the door on a banknote — if it slides out easily, the seal is worn.",
            "Listen for a water pump that runs constantly or cycles every few minutes (leak or faulty pressure switch).",
            "Clean fan and AC filters, and oil fan bearings if they squeak.",
            "Replace the worst offender; a new efficient appliance often pays for itself in a year.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 0,
        partsHigh: 200000,
        laborLow: 0,
        laborHigh: 200000,
        notes:
          "Most fixes are free (changing habits). A plug-in power meter costs Rp 100.000-200.000. If leakage is suspected, an electrician's insulation test costs around Rp 150.000-200.000.",
      },
      safetyChecklist: [
        "Never open the electricity meter (kWh meter) yourself — it is PLN property and sealed.",
        "Do not bypass or tamper with the meter; it is illegal and dangerous.",
        "Turn off the MCB before inspecting any appliance's cable or plug.",
        "If you suspect a leak to earth, do not touch metal taps, pipes, or the panel.",
        "Report suspected theft or a faulty meter to PLN (123) — do not investigate the incoming supply yourself.",
      ],
      callAPro: {
        when: [
          "The meter disc spins fast even with every appliance and MCB in the house off.",
          "You feel a tingle or shock from a tap, a metal door, or an appliance body.",
          "The bill jumped suddenly with no change in your habits.",
          "You find a cable tapped into your supply that is not yours.",
        ],
        why: "A spinning meter with no load, or any shock from metal parts, means current is leaking somewhere — possibly through water pipes or the earth. That is dangerous and can be fatal. Call an electrician and PLN immediately.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "Alat berdaya besar menyala lebih lama dari yang disadari",
          likelihood: "High",
          explanation:
            "Pemanas air, AC, kulkas tua, dan pompa air adalah tersangka biasa. Pemanas air menyala 24 jam, atau AC disetel sangat dingin, bisa menggandakan tagihan tanpa ada kerusakan sama sekali.",
        },
        {
          cause: "Alat tua atau rusak menarik arus berlebih",
          likelihood: "Medium",
          explanation:
            "Kulkas tua dengan karet pintu aus, pompa yang hidup-mati terus, atau kipas dengan bearing kering menarik daya jauh lebih besar dari labelnya.",
        },
        {
          cause: "Kebocoran arus atau sambungan liar di jalur Anda",
          likelihood: "Low",
          explanation:
            "Jarang, tapi nyata: kabel rusak yang bocor ke tanah, atau ada yang mencuri listrik dari jalur Anda. Curigai ini hanya kalau pemakaian melonjak tanpa perubahan kebiasaan dan meteran berputar padahal semua alat mati.",
        },
      ],
      fixSteps: [
        {
          cause: "Alat berdaya besar menyala lebih lama dari yang disadari",
          difficulty: "Easy",
          tools: ["Meteran listrik atau meteran token", "Power meter colok (opsional)"],
          steps: [
            "Daftar semua alat dan dayanya (tertera di label).",
            "Matikan semua alat, lalu nyalakan satu per satu sambil perhatikan kecepatan meteran.",
            "Alat yang membuat meteran berputar paling cepat adalah biaya terbesar Anda.",
            "Nyalakan pemanas air hanya saat dibutuhkan, setel AC 24-25°C, dan matikan beban standby di malam hari.",
            "Pertimbangkan power meter colok (Rp 100.000-200.000) untuk mengukur konsumsi nyata tiap alat.",
          ],
        },
        {
          cause: "Alat tua atau rusak menarik arus berlebih",
          difficulty: "Medium",
          tools: ["Power meter colok", "Obeng"],
          steps: [
            "Ukur tiap alat yang dicurigai dengan power meter colok selama 24 jam.",
            "Periksa karet pintu kulkas: jepit uang kertas di pintu — kalau mudah ditarik, karetnya sudah aus.",
            "Dengarkan pompa air yang menyala terus atau hidup-mati tiap beberapa menit (bocor atau pressure switch rusak).",
            "Bersihkan filter kipas dan AC, dan beri pelumas pada bearing kipas kalau berdecit.",
            "Ganti alat yang paling boros; alat baru yang hemat sering balik modal dalam setahun.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 0,
        partsHigh: 200000,
        laborLow: 0,
        laborHigh: 200000,
        notes:
          "Kebanyakan perbaikan gratis (ubah kebiasaan). Power meter colok Rp 100.000-200.000. Kalau dicurigai ada kebocoran, tes isolasi oleh tukang listrik sekitar Rp 150.000-200.000.",
      },
      safetyChecklist: [
        "Jangan pernah membuka meteran listrik (kWh meter) sendiri — itu milik PLN dan disegel.",
        "Jangan mem-bypass atau mengutak-atik meteran; itu ilegal dan berbahaya.",
        "Matikan MCB sebelum memeriksa kabel atau steker alat apa pun.",
        "Kalau mencurigai ada kebocoran ke tanah, jangan sentuh keran, pipa, atau panel logam.",
        "Laporkan dugaan pencurian atau meteran rusak ke PLN (123) — jangan selidiki pasokan masuk sendiri.",
      ],
      callAPro: {
        when: [
          "Piringan meteran berputar cepat padahal semua alat dan MCB di rumah sudah mati.",
          "Ada rasa kesetrum dari keran, pintu logam, atau bodi alat.",
          "Tagihan melonjak tiba-tiba tanpa perubahan kebiasaan.",
          "Ada kabel sambungan liar yang bukan milik Anda.",
        ],
        why: "Meteran berputar tanpa beban, atau ada sengatan dari bagian logam, berarti ada arus bocor — mungkin lewat pipa air atau tanah. Itu berbahaya dan bisa fatal. Segera panggil tukang listrik dan PLN.",
      },
    },
  },
  {
    key: "switch-dead",
    keywords: [
      "switch", "saklar", "light won't turn on", "lampu tidak menyala",
      "lampu mati", "saklar rusak", "switch not working",
    ],
    en: {
      diagnosis: [
        {
          cause: "Dead or loose bulb",
          likelihood: "High",
          explanation:
            "Always check the bulb first — it is the cheapest fix. A bulb can fail silently, and a loose bulb in its holder behaves exactly like a dead switch.",
        },
        {
          cause: "Worn-out switch mechanism",
          likelihood: "Medium",
          explanation:
            "Switches wear out after years of use. The toggle feels loose, mushy, or does not click, and the light works only sometimes or not at all.",
        },
        {
          cause: "Loose wire at the switch terminal",
          likelihood: "Medium",
          explanation:
            "Heat and vibration loosen the terminal screws over time. The switch looks fine but the wire behind it is barely touching, so the light is dead or flickers.",
        },
      ],
      fixSteps: [
        {
          cause: "Dead or loose bulb",
          difficulty: "Easy",
          tools: ["Replacement bulb", "Dry cloth"],
          steps: [
            "Turn off the switch and let the bulb cool.",
            "Unscrew the bulb and check for a blackened base or broken filament.",
            "Try a known-good bulb. If it lights, the old bulb is dead — replace it.",
            "If the new bulb also stays dark, the problem is the switch or the wiring.",
          ],
        },
        {
          cause: "Worn-out switch mechanism",
          difficulty: "Medium",
          tools: ["Test pen", "Insulated screwdriver", "Replacement switch"],
          steps: [
            "Turn off the MCB for the lighting circuit and confirm it is dead.",
            "Remove the switch faceplate and unscrew the switch from the wall box.",
            "Note which wire goes to which terminal (take a photo first).",
            "Move the wires to the same terminals on the new switch and tighten firmly.",
            "Refit, restore power, and test the switch several times.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 20000,
        partsHigh: 60000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "A replacement switch costs Rp 20.000-60.000; a bulb Rp 25.000-100.000. An electrician charges around Rp 100.000-150.000 to replace a switch including the visit.",
      },
      safetyChecklist: [
        "Turn off the MCB for the lighting circuit before opening a switch.",
        "Confirm the switch is dead with a test pen — a switch can be live even when it is off.",
        "Take a photo of the wiring before disconnecting anything.",
        "Never work on wiring with wet hands.",
        "Use insulated tools only.",
      ],
      callAPro: {
        when: [
          "The wires behind the switch are burnt or melted.",
          "More than one switch or light on the same circuit is dead.",
          "The wall box is cracked or the wires are too short to reconnect.",
          "You are not sure which wire is live — guessing is not an option.",
        ],
        why: "Burnt wiring behind a switch, or several dead points on one circuit, points to a fault in the fixed wiring. Miswiring a switch can leave a fitting permanently live — a shock risk. A licensed electrician should handle it.",
      },
    },
    id: {
      diagnosis: [
        {
          cause: "Bohlam mati atau longgar",
          likelihood: "High",
          explanation:
            "Selalu periksa bohlam dulu — itu perbaikan termurah. Bohlam bisa mati tanpa tanda, dan bohlam longgar di fittingnya persis seperti saklar mati.",
        },
        {
          cause: "Mekanisme saklar sudah aus",
          likelihood: "Medium",
          explanation:
            "Saklar aus setelah bertahun-tahun dipakai. Tuasnya terasa longgar, lembek, atau tidak berbunyi klik, dan lampu hanya menyala kadang-kadang atau tidak sama sekali.",
        },
        {
          cause: "Kabel longgar di terminal saklar",
          likelihood: "Medium",
          explanation:
            "Panas dan getaran mengendorkan sekrup terminal dari waktu ke waktu. Saklar terlihat baik-baik saja tapi kabel di belakangnya hampir tidak menyentuh, jadi lampu mati atau berkedip.",
        },
      ],
      fixSteps: [
        {
          cause: "Bohlam mati atau longgar",
          difficulty: "Easy",
          tools: ["Bohlam pengganti", "Kain kering"],
          steps: [
            "Matikan saklar dan biarkan bohlam dingin.",
            "Lepas bohlam dan periksa pangkalnya menghitam atau filamen putus.",
            "Coba bohlam lain yang sudah pasti bagus. Kalau menyala, bohlam lama mati — ganti saja.",
            "Kalau bohlam baru juga tetap gelap, masalahnya ada di saklar atau kabel.",
          ],
        },
        {
          cause: "Mekanisme saklar sudah aus",
          difficulty: "Medium",
          tools: ["Tespen", "Obeng berisolasi", "Saklar pengganti"],
          steps: [
            "Matikan MCB sirkuit lampu dan pastikan tidak ada arus.",
            "Lepas pelat saklar dan buka saklar dari kotak dinding.",
            "Catat kabel mana ke terminal mana (foto dulu).",
            "Pindahkan kabel ke terminal yang sama pada saklar baru dan kencangkan.",
            "Pasang kembali, nyalakan listrik, dan tes saklar beberapa kali.",
          ],
        },
      ],
      costEstimate: {
        currency: "IDR",
        partsLow: 20000,
        partsHigh: 60000,
        laborLow: 0,
        laborHigh: 150000,
        notes:
          "Saklar pengganti Rp 20.000-60.000; bohlam Rp 25.000-100.000. Tukang listrik biasanya Rp 100.000-150.000 untuk ganti saklar termasuk kunjungan.",
      },
      safetyChecklist: [
        "Matikan MCB sirkuit lampu sebelum membuka saklar.",
        "Pastikan saklar mati dengan tespen — saklar bisa berarus walau posisinya mati.",
        "Foto kabel sebelum melepas apa pun.",
        "Jangan kerjakan kabel dengan tangan basah.",
        "Gunakan alat berisolasi saja.",
      ],
      callAPro: {
        when: [
          "Kabel di belakang saklar gosong atau meleleh.",
          "Lebih dari satu saklar atau lampu di sirkuit yang sama mati.",
          "Kotak dinding retak atau kabel terlalu pendek untuk disambung lagi.",
          "Anda tidak yakin kabel mana yang berarus — menebak bukan pilihan.",
        ],
        why: "Kabel gosong di belakang saklar, atau beberapa titik mati di satu sirkuit, menandakan kerusakan pada instalasi tetap. Salah pasang saklar bisa membuat fitting terus berarus — risiko sengatan. Serahkan ke tukang listrik berlisensi.",
      },
    },
  },
];

const GENERIC: Record<Lang, AnalysisResult> = {
  en: {
    diagnosis: [
      {
        cause: "Loose connection somewhere in the circuit",
        likelihood: "Medium",
        explanation:
          "Many household electrical problems come down to a connection that worked loose over time — at a socket, switch, junction box, or the panel.",
      },
      {
        cause: "A worn or faulty component (switch, socket, bulb, MCB)",
        likelihood: "Medium",
        explanation:
          "Components wear out. A switch that no longer clicks, a socket that no longer grips a plug, or an MCB that trips too easily are all common with age.",
      },
      {
        cause: "Overload or a fault in the fixed wiring",
        likelihood: "Low",
        explanation:
          "If the problem affects a whole circuit or comes with heat, smell, or tripping, the fixed wiring itself may be at fault.",
      },
    ],
    fixSteps: [
      {
        cause: "Loose connection somewhere in the circuit",
        difficulty: "Medium",
        tools: ["Test pen", "Insulated screwdriver"],
        steps: [
          "Turn off the MCB for the affected circuit and confirm it is dead with a test pen.",
          "Check the most likely points first: the socket, switch, or fitting involved.",
          "Tighten any loose terminal screws and replace any connector that looks burnt.",
          "Restore power and test. If the problem returns, the fault is deeper in the wiring.",
        ],
      },
      {
        cause: "A worn or faulty component (switch, socket, bulb, MCB)",
        difficulty: "Easy",
        tools: ["Replacement part of the same type", "Test pen", "Insulated screwdriver"],
        steps: [
          "Identify the exact component: test the bulb in another fitting, or the appliance in another socket.",
          "Turn off the MCB and confirm the circuit is dead.",
          "Replace the faulty component with one of the same type and rating.",
          "Restore power and test before using it for heavy loads.",
        ],
      },
    ],
    costEstimate: {
      currency: "IDR",
      partsLow: 20000,
      partsHigh: 120000,
      laborLow: 0,
      laborHigh: 200000,
      notes:
        "Small parts (switch, socket, bulb, MCB) cost Rp 20.000-120.000. An electrician's visit for diagnosis and a small repair is typically Rp 100.000-200.000.",
    },
    safetyChecklist: [
      "Turn off the MCB for the circuit before touching anything.",
      "Confirm the circuit is dead with a test pen.",
      "Use insulated tools and dry hands.",
      "Never work on a live circuit.",
      "If you smell burning or see sparks, stop and call an electrician.",
    ],
    callAPro: {
      when: [
        "The problem affects a whole circuit or the whole house.",
        "There is heat, a burning smell, sparks, or smoke.",
        "The MCB trips with nothing plugged in.",
        "You are unsure which wire is live.",
      ],
      why: "Whole-circuit faults, heat, and burning smells point to the fixed wiring. That is a fire and shock risk that needs a licensed electrician.",
    },
  },
  id: {
    diagnosis: [
      {
        cause: "Ada sambungan longgar di sirkuit",
        likelihood: "Medium",
        explanation:
          "Banyak masalah listrik rumah berujung pada sambungan yang mengendor dari waktu ke waktu — di stopkontak, saklar, kotak sambung, atau panel.",
      },
      {
        cause: "Komponen aus atau rusak (saklar, stopkontak, bohlam, MCB)",
        likelihood: "Medium",
        explanation:
          "Komponen bisa aus. Saklar yang tidak berbunyi klik lagi, stopkontak yang tidak menjepit steker, atau MCB yang terlalu mudah trip — semuanya umum terjadi karena usia.",
      },
      {
        cause: "Beban berlebih atau kerusakan pada instalasi tetap",
        likelihood: "Low",
        explanation:
          "Kalau masalahnya memengaruhi satu sirkuit penuh atau disertai panas, bau, atau trip, instalasi tetapnya sendiri mungkin bermasalah.",
      },
    ],
    fixSteps: [
      {
        cause: "Ada sambungan longgar di sirkuit",
        difficulty: "Medium",
        tools: ["Tespen", "Obeng berisolasi"],
        steps: [
          "Matikan MCB sirkuit yang bermasalah dan pastikan tidak ada arus dengan tespen.",
          "Periksa titik yang paling mungkin dulu: stopkontak, saklar, atau fitting yang terlibat.",
          "Kencangkan sekrup terminal yang longgar dan ganti konektor yang terlihat gosong.",
          "Nyalakan lagi dan tes. Kalau masalah kembali, kerusakannya lebih dalam di kabel.",
        ],
      },
      {
        cause: "Komponen aus atau rusak (saklar, stopkontak, bohlam, MCB)",
        difficulty: "Easy",
        tools: ["Suku cadang pengganti sejenis", "Tespen", "Obeng berisolasi"],
        steps: [
          "Kenali komponen yang rusak: tes bohlam di fitting lain, atau alat di stopkontak lain.",
          "Matikan MCB dan pastikan sirkuit mati.",
          "Ganti komponen rusak dengan yang sejenis dan rating sama.",
          "Nyalakan lagi dan tes sebelum dipakai untuk beban berat.",
        ],
      },
    ],
    costEstimate: {
      currency: "IDR",
      partsLow: 20000,
      partsHigh: 120000,
      laborLow: 0,
      laborHigh: 200000,
      notes:
        "Suku cadang kecil (saklar, stopkontak, bohlam, MCB) Rp 20.000-120.000. Kunjungan tukang listrik untuk diagnosa dan perbaikan kecil biasanya Rp 100.000-200.000.",
    },
    safetyChecklist: [
      "Matikan MCB sirkuit itu sebelum menyentuh apa pun.",
      "Pastikan sirkuit mati dengan tespen.",
      "Pakai alat berisolasi dan tangan kering.",
      "Jangan pernah kerjakan sirkuit yang masih berarus.",
      "Kalau ada bau gosong atau percikan, berhenti dan panggil tukang listrik.",
    ],
    callAPro: {
      when: [
        "Masalah memengaruhi satu sirkuit penuh atau seluruh rumah.",
        "Ada panas, bau gosong, percikan, atau asap.",
        "MCB trip padahal tidak ada yang tercolok.",
        "Anda tidak yakin kabel mana yang berarus.",
      ],
      why: "Kerusakan satu sirkuit penuh, panas, dan bau gosong menandakan instalasi tetap bermasalah. Itu risiko kebakaran dan sengatan yang butuh tukang listrik berlisensi.",
    },
  },
};

/** Score an entry against the problem text (count keyword hits). */
function scoreEntry(entry: MockEntry, text: string): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of entry.keywords) {
    if (lower.includes(kw)) score += kw.length > 4 ? 2 : 1;
  }
  return score;
}

/** Analyse a problem with the built-in rule engine (demo mode only). */
export function mockAnalyze(problem: string, lang: Lang): AnalysisResult {
  let best: MockEntry | null = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    const s = scoreEntry(entry, problem);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }
  if (best && bestScore > 0) return lang === "id" ? best.id : best.en;
  return GENERIC[lang];
}

/** Sample problems, each tied to a mock entry so the demo is deterministic. */
export interface SampleProblem {
  mockId: string;
  en: string;
  id: string;
}

export const SAMPLES: SampleProblem[] = [
  {
    mockId: "mcb-tripping",
    en: "The MCB keeps tripping whenever I turn on the rice cooker",
    id: "MCB sering trip setiap kali rice cooker dinyalakan",
  },
  {
    mockId: "flickering-lights",
    en: "The living room lights flicker every evening",
    id: "Lampu ruang tamu berkedip setiap malam",
  },
  {
    mockId: "dead-outlet",
    en: "The outlet in the kitchen is completely dead",
    id: "Stopkontak di dapur mati total",
  },
  {
    mockId: "burning-smell",
    en: "There is a burning smell coming from the bedroom outlet",
    id: "Ada bau gosong dari stopkontak kamar tidur",
  },
  {
    mockId: "high-bill",
    en: "My electricity bill doubled this month and I don't know why",
    id: "Tagihan listrik saya naik dua kali lipat bulan ini",
  },
  {
    mockId: "switch-dead",
    en: "The bathroom light switch does nothing when I flip it",
    id: "Saklar lampu kamar mandi tidak berfungsi sama sekali",
  },
];
