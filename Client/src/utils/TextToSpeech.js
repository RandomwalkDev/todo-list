const textToSpeech = (message) => {
    if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 0.7;

        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        // Speak the utterance
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Speech Synthesis is not supported in your browser");
    }
}

export default textToSpeech