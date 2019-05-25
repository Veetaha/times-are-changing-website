declare module 'generate-rsa-keypair' {
    export interface KeyPair {
        public:  string;
        private: string;
    }

    export default function(): KeyPair;
}