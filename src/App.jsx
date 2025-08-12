import { useEffect, useState } from "react";
import { db, ref, onValue, set } from "./firebase";

const INITIAL_STATE = {
    pot: 0,
    players: {
        player1: { chips: 1000 },
        player2: { chips: 1000 }
    }
};

function App() {
    const [game, setGame] = useState(INITIAL_STATE);

    useEffect(() => {
        const gameRef = ref(db, "pokerGame");
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setGame(data);
            else set(gameRef, INITIAL_STATE); // inizializza se vuoto
        });
    }, []);

    function updatePot(amount) {
        const gameRef = ref(db, "pokerGame");
        const newPot = Math.max(0, game.pot + amount);
        set(gameRef, { ...game, pot: newPot });
    }

    function updateChips(playerId, amount) {
        const gameRef = ref(db, "pokerGame");
        const player = game.players[playerId];
        if (!player) return;

        const newChips = Math.max(0, player.chips + amount);
        const newPlayers = { ...game.players, [playerId]: { chips: newChips } };

        set(gameRef, { ...game, players: newPlayers });
    }

    return (
        <div style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif", padding: 20 }}>
            <h1>Contatore Piatto e Chips</h1>

            <div style={{ marginBottom: 20 }}>
                <h2>Piatto (Pot): ${game.pot}</h2>
                <button onClick={() => updatePot(10)}>+10</button>
                <button onClick={() => updatePot(-10)} disabled={game.pot === 0}>-10</button>
            </div>

            {Object.entries(game.players).map(([id, player]) => (
                <div key={id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
                    <h3>{id}</h3>
                    <p>Chips: ${player.chips}</p>
                    <button onClick={() => updateChips(id, 50)}>+50 Chips</button>
                    <button onClick={() => updateChips(id, -50)} disabled={player.chips === 0}>-50 Chips</button>
                </div>
            ))}
        </div>
    );
}

export default App;
