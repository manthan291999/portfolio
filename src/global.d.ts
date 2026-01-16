/// <reference types="@react-three/fiber" />

import { ThreeElements } from '@react-three/fiber';

declare global {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements { }
    }
}

// Declare maath module
declare module 'maath/random/dist/maath-random.esm' {
    export function inSphere(array: Float32Array, options: { radius: number }): Float32Array;
    export function onSphere(array: Float32Array, options: { radius: number }): Float32Array;
    export function inBox(array: Float32Array, options: { sides: number[] }): Float32Array;
}

// Extend Window interface for Speech Recognition
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
}

declare global {
    interface Window {
        webkitSpeechRecognition: new () => SpeechRecognition;
        SpeechRecognition: new () => SpeechRecognition;
    }
}

export { };
