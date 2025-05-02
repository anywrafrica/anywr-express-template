import crypto from "node:crypto";

export default function generateOneTimePassword() {
    return crypto.randomInt(100000, 1000000).toString();
}