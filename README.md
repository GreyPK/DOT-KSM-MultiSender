# DOT-KSM-MultiSender
DOT/KSM MultiSender

Use at your own risk. I am not responsible for any mistakes, bugs, loss of funds.

1. Install node.js LTS version from https://nodejs.org/en/
2. Install git https://git-scm.com/downloads and run command in terminal "git clone https://github.com/GreyPK/DOT-KSM-MultiSender.git"

3. Open repository folder in terminal and run command "npm i"
4. Change file multisender-dot.js for DOT or multisender-ksm.js for KSM:
  a) Add mnemonic of your wallet in line 4
  b) Change recipients array in line 10
  c) Change sending amount to each recipient in line 16
5. Run script with command "node multisender-dot.js" for DOT or "node multisender-ksm.js" for KSM
