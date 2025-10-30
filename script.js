const chat = [
    { question: "hii", reply: ["Hii baby", "Hii", "Hii love"], delay: 20 },
    { question: "hello", reply: ["Hello baby", "Hii sweetheart"], delay: 20 },
    { question: "kaisi ho", reply: ["Main theek hoon aur tum?"], delay: 14 },
    { question: "main bhi theek hu", reply: ["Acha laga sunke", "Achi baat hai"], delay: 12 },
    { question: "kya kar rahi ho", reply: ["Tumhare baare mein soch rahi thi", "Bas chill kar rahi hoon aur tum?", "Tumhare message ka intezaar",], delay: 12 },
    { question: "acha mere baare main", reply: ["Haan to aur kiske baare main sochungi"], delay: 12 },
    { question: "acha mere message ka", reply: ["Haan to aur kiske message ka"], delay: 12 },
    { question: "main bhi bas time pass", reply: ["Badhiya hai karo time pass", "Kiske saath?"], delay: 16 },
    { question: "kiske saath matlab", reply: ["Kuch nahi"], delay: 16 },
    { question: "mujhe tumse kuch baat karni hai", reply: ["Haan bolo", "Bolo baby", "kya hua?"], delay: 10 },
    { question: "tum mujhe pasand karti ho?", reply: ["Are hum GF BF hain bhul gaye", "Of course baby"], delay: 20 },
    { question: "mera dost tumse baat karna chahta hai", reply: ["Mujhe nahi karni kisi se baat", "Mujhe sirf tumse baat karni hai"], delay: 14 },
    { question: "i want to kiss you", reply: ["I want also too", "Aww baby come here"], delay: 14 },
    { question: "i love you", reply: ["I love you too"], delay: 12 },
    { question: "chalo bye", reply: ["Bye baby Take care", "Phir milte hain"], delay: 18 },
    { question: "khana khaye", reply: ["Haan thoda sa, tumne?"], delay: 12 },
    { question: "abhi nahi", reply: ["To kab khaoge?"], delay: 12 },
    { question: "kha liya maine", reply: ["Achi baat hai"], delay: 12 },
    { question: "bas thodi der main", reply: ["Acha"], delay: 12 },
    { question: "miss you", reply: ["Main bhi tumhe miss kar rahi hoon", "Tumhare bina dil nahi lagta"], delay: 14 },
    { question: "kahan ho", reply: ["ghar pe hoon", "Tum batao kahan ho?"], delay: 12 },
    { question: "main to school main hu", reply: ["Acha School main ho to padhai karo"], delay: 16 },
    { question: "good morning", reply: ["Good morning baby"], delay: 24 },
    { question: "good night", reply: ["Good night baby"], delay: 10 },
    { question: "tum mujhe yaad karti ho", reply: ["Roz karti hoon", "Hamesha karti hoon"], delay: 14 },
    { question: "sorry", reply: ["Koi baat nahi baby", "Thik hai, maaf kiya"], delay: 12 },
    { question: "kab milogi", reply: ["Jab tum bula lo tab hi"], delay: 15 },
    { question: "tumse baat karke acha lagta hai", reply: ["Mujhe bhi bahut acha lagta hai"], delay: 14 }
];


// 💖 Random cute photos
const photos = [
    "https://i.pinimg.com/736x/63/29/64/6329640569be23e0f9f1a74d19036eb1.jpg",
    "https://i.pinimg.com/736x/ba/16/2c/ba162cf8ccf9aaf1a70b4c791a4e4cf7.jpg",
    "https://i.pinimg.com/736x/de/8d/43/de8d43d6f70993bb4deae302bb708a80.jpg",
    "https://i.pinimg.com/736x/59/ac/c5/59acc5462654b3f425f0350efc294978.jpg"
];

const chatLog = document.getElementById("chatLog");
const input = document.getElementById("userInput");

// Scroll helper
function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Capitalize helper
function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 💬 Typing indicator
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing text-pink-300 italic text-sm pl-2";
    typingDiv.textContent = "Typing";
    chatLog.appendChild(typingDiv);
    scrollToBottom();

    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        typingDiv.textContent = "Typing" + ".".repeat(dots);
    }, 400);

    return { typingDiv, interval };
}

// Handle Enter key
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitQuestion();
});

let userMessage;
let typingTime;
let thinkingDelay;

// 🌸 Main Function
function submitQuestion() {
    const message = input.value.trim();
    userMessage = input.value.trim();
    if (!message) return;

    input.value = "";

    // Show user message
    chatLog.insertAdjacentHTML(
        "beforeend",
        `<div class="flex justify-end w-full p-1">
            <div class="bg-pink-500 px-3 py-2 max-w-[80%] rounded-lg text-lg text-white break-words">${capitalize(message)}</div>
        </div>`
    );
    scrollToBottom();

    if (message.toLowerCase() === "clear") {
        chatLog.innerHTML = "";
        return;
    }

    const replyData = getReply(message.toLowerCase());

    // Special case: ek photo bhejo apni
    if (message.toLowerCase() === "ek photo bhejo apni" || message.toLowerCase() === "ek photo aur" || message.toLowerCase() === "ek aur") {
        if (!window.remainingPhotos) window.remainingPhotos = [...photos];

        if (window.remainingPhotos.length > 0) {
            const randomIndex = Math.floor(Math.random() * window.remainingPhotos.length);
            const photo = window.remainingPhotos.splice(randomIndex, 1)[0];

            setTimeout(() => {
                chatLog.insertAdjacentHTML(
                    "beforeend",
                    `<div class="flex justify-start w-full p-1">
                        <div class="bg-pink-200/20 px-3 py-2 max-w-[80%] rounded-lg text-lg text-white break-words">
                            <img src="${photo}" alt="GF photo 💕" class="rounded-lg w-full">
                        </div>
                    </div>`
                );
                scrollToBottom();
            }, 30000);
        } else {
            setTimeout(() => {
                const { typingDiv, interval } = showTyping();
                setTimeout(() => {
                    clearInterval(interval);
                    typingDiv.remove();
                    chatLog.insertAdjacentHTML(
                        "beforeend",
                        `<div class="flex justify-start w-full p-1">
                            <div class="bg-pink-200/20 px-3 py-2 max-w-[80%] rounded-lg text-lg text-white break-words">
                                Abhi aur photos nahi hain baby Next time bhej dungi
                            </div>
                        </div>`
                    );
                    scrollToBottom();
                }, 3000);
            }, 1500);
        }
        return;
    }

    // Normal reply
    if (userMessage === 'hii' || userMessage === 'hello') {
        thinkingDelay = 20000 + Math.random() * 10500;
    } else {
        thinkingDelay = 8000 + Math.random() * 1500;
    }

    typingTime = Math.max(1500, Math.min(message.length * 2000, 6000));

    setTimeout(() => {
        const { typingDiv, interval } = showTyping();

        setTimeout(() => {
            clearInterval(interval);
            typingDiv.remove();

            chatLog.insertAdjacentHTML(
                "beforeend",
                `<div class="flex justify-start w-full p-1">
                    <div class="bg-pink-200/20 px-3 py-2 max-w-[80%] rounded-lg text-lg text-white break-words">${replyData.reply}</div>
                </div>`
            );

            scrollToBottom();
        }, typingTime);
    }, thinkingDelay);
}

// 🧠 Smart Reply Function
function getReply(message) {
    const found = chat.find(item => item.question === message);

    if (found) {
        const replies = Array.isArray(found.reply) ? found.reply : [found.reply];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        return { reply: randomReply, delay: found.delay * 2000 };
    } else {
        const defaultReplies = [
            "Hmm kya matlab?",
            "Samjhi nahi",
            "Hmm cute ho tum"
        ];
        const randomDefault = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
        return { reply: randomDefault, delay: 3000 };
    }
}


