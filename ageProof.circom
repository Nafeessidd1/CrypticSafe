pragma circom 2.0.0;

template AgeProof() {
    signal input age;
    signal output valid;

    valid <-- age > 18? 1 : 0;
}

component main = AgeProof();