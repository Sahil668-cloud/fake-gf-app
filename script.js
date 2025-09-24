const chat = [
    {
        question: "Hii",
        reply: "Hello Baby"
    },
    {
        question: "Hello",
        reply: "Hello Baby"
    },
    {
        question: "Kaisi ho",
        reply: "Main theek hoon aur tum?"
    },
    {
        question: "Main bhi theek hu",
        reply: "Achi baat hai Aur batao"
    },
    {
        question: "Kya kar rahi ho",
        reply: "Main tumhare baare mein hi soch rahi thi"
    },
    {
        question: "Mujhe tumse kuch baat karni hai",
        reply: "Haan, bolo kya baat hai?"
    },
    {
        question: "Tum mujhe pasand karti ho?",
        reply: "Haan, main tumse bahut pyaar karti hoon"
    },
    {
        question: "Mera friend tumse baat karna chahta hai",
        reply: "Mujhe nahi karni baat kisi BKL se"
    },
    {
        question: "I want to kiss you",
        reply: "I also Baby"
    },
    {
        question: "I love you",
        reply: "I love you too"
    },
    {
        question: "Bye",
        reply: "Bye! Take care"
    },

];


function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

let photos = ["https://i.pinimg.com/736x/63/29/64/6329640569be23e0f9f1a74d19036eb1.jpg", "https://i.pinimg.com/736x/ba/16/2c/ba162cf8ccf9aaf1a70b4c791a4e4cf7.jpg", "https://i.pinimg.com/736x/de/8d/43/de8d43d6f70993bb4deae302bb708a80.jpg", "https://i.pinimg.com/736x/59/ac/c5/59acc5462654b3f425f0350efc294978.jpg",];
const photo = photos[Math.floor(Math.random() * photos.length)];
// let reply;
// let message;
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitQuestion(); // Call your function
    }
});
let message;
let delay = 500;
function submitQuestion() {
    // Get the value from the input field
    const input = document.getElementById('userInput');
    message = input.value;
    lowerMessage = message.toLowerCase();
    if (lowerMessage.trim() === '') {
        return; // Do nothing if the input is empty
    }
    else if (lowerMessage.trim() == 'clear') {
        document.getElementById('chatLog').innerHTML = '';
        input.value = '';
    }
    else {
        setTimeout(() => {
            // Display the user's message
            document.getElementById('chatLog').insertAdjacentHTML("beforeend", `<div class="flex justify-end w-full p-1">
                <div class="text-white bg-zinc-700 px-3 max-w-[80%] break-words rounded-lg text-lg w-fit p-1">${lowerMessage}</div>
            </div>`);
            scrollToBottom();
        }, delay);


        // Get the reply based on the input question
        const reply = getreply(lowerMessage);
        if (lowerMessage.trim() == 'ek photo bhejo apni') {
            setTimeout(() => {
                // Display the photo
                document.getElementById('chatLog').insertAdjacentHTML("beforeend", `<div class="flex justify-start w-full p-1">
                <div class="text-white bg-zinc-700 px-3 max-w-[80%] break-words rounded-lg text-lg w-fit p-1"><img class="w-full" src"${photo}" loading="lazy"></div>
            </div>`);
                scrollToBottom();
            }, delay * 4);

        }
        else {
            setTimeout(() => {
                // Display the reply
                document.getElementById('chatLog').insertAdjacentHTML("beforeend", `<div class="flex justify-start w-full p-1">
                <div class="text-white bg-zinc-700 px-3 max-w-[80%] break-words rounded-lg text-lg w-fit p-1">${reply}</div>
            </div>`);
                scrollToBottom();
            }, delay * 4);

        }
        input.value = ''; // Clear the input field
    }
    scrollToBottom();
}


function getreply(message) {
    // Find the question that matches the message
    const found = chat.find(item => item.question.toLocaleLowerCase() == message);

    // If found, return the reply, otherwise return a default message
    if (found) {
        return found.reply;
    } else {
        return "Kya??";
    }
}



