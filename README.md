circom ageProof.circom --r1cs --wasm --sym

snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contributor"


snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
snarkjs groth16 setup ageProof.r1cs pot12_final.ptau ageProof_0000.zkey
snarkjs zkey contribute ageProof_0000.zkey ageProof_0001.zkey --name="Second contributor"
snarkjs zkey export verificationkey ageProof_0001.zkey verification_key.json

node ageProof_js/generate_witness.js ageProof_js/ageProof.wasm input.json witness.wtns
