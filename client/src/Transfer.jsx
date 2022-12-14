import { useState } from "react";
import server from "./server";

function Transfer({ setBalance, transactionData, setTransactionData }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        try {
            const {
                data: { balance, message },
            } = await server.post(`send`, {
                sender: transactionData.publicKey,
                messageHex: transactionData.messageHex,
                signTransactionHex: transactionData.signTransactionHex,
                amount: parseInt(sendAmount),
                recipient,
            });
            setBalance(balance);
            setTransactionData((prevData) => {
                return {
                    publicKey: prevData.publicKey,
                    messageHex: "",
                    signTransactionHex: "",
                };
            });
            setSendAmount("");
            setRecipient("");
            alert(message);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient Public Key
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;
