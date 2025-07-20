import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Container,
  Paper,
} from "@mui/material";

const SPECIAL_ROLES = [
  "Moderador", // TODO: este no tendria que contar como personaje para decidir el # de lobos de partida
  "Bruja",
  "Niña",
  "Cupido",
  "Cazador 1",
  "Cazador 2",
  "Guardia",
  "Vidente",
  "Anciano",
  "Chivo expiatorio",
  "Aguacil",
  "Flautista",
  "Ladron 1",
  "Ladron 2",
  "Salvador",
  "Tonto del Pueblo",
];

function getNumWolves(players) {
  if (players < 7) return 1;
  if (players === 7) return 2;
  return Math.floor(players / 4);
}

export default function Lobos() {
  const [numPlayers, setNumPlayers] = useState(9);
  const [numWolves, setNumWolves] = useState(() => getNumWolves(numPlayers));
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [phase, setPhase] = useState("setup");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    setNumWolves(getNumWolves(numPlayers));
  }, [numPlayers]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const generateRoles = () => {
    const roles = [];

    for (let i = 0; i < numWolves; i++) {
      roles.push("Lobo");
    }

    selectedRoles.forEach((role) => {
      if (roles.length < numPlayers) {
        roles.push(role);
      }
    });

    while (roles.length < numPlayers) {
      roles.push("Aldeano");
    }

    const shuffled = roles
      .map((r) => ({ role: r, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((r) => r.role);

    setDistribution(shuffled);
    setPhase("reveal");
    setCurrentIndex(0);
    setShowRole(false);
  };

  const nextPlayer = () => {
    if (showRole) {
      if (currentIndex + 1 >= distribution.length) {
        setPhase("finished");
      } else {
        setCurrentIndex(currentIndex + 1);
        setShowRole(false);
      }
    } else {
      setShowRole(true);
    }
  };

  if (phase === "reveal") {
    return (
      <Box
        height="100vh"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        onClick={nextPlayer}
        sx={{ cursor: "pointer", textAlign: "center", px: 2 }}
      >
        {showRole ? (
          <>
            <Typography variant="h5" gutterBottom>
              Jugador {currentIndex + 1}
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {distribution[currentIndex]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (Haz clic para pasar al siguiente jugador)
            </Typography>
          </>
        ) : (
          <Typography variant="h4">Clica para ver tu personaje</Typography>
        )}
      </Box>
    );
  }

  if (phase === "finished") {
    return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#e0f2f1"
        textAlign="center"
        px={2}
      >
        <Typography variant="h4" gutterBottom>
          ¡Distribución completa!
        </Typography>
        <Typography variant="body1" mb={4}>
          Todos los jugadores ya han visto su personaje.
        </Typography>
        <Typography variant="body1" mb={4}>
          Resumen:
          <br />
          <li>Numero de jugadores: {numPlayers}</li>
          <li>Numero de lobos: {numWolves}</li>
          <li>Aldeanos: {numPlayers - numWolves - selectedRoles.length}</li>
          <li>Personajes especiales: {selectedRoles.join(", ")}</li>
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setPhase("setup");
            setSelectedRoles([]);
            setDistribution([]);
          }}
        >
          Empezar de nuevo
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <TextField
          label="Número de jugadores"
          type="number"
          value={numPlayers}
          onChange={(e) => setNumPlayers(parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Número de lobos"
          type="number"
          value={numWolves}
          onChange={(e) => setNumWolves(parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />

        <Typography variant="subtitle1" gutterBottom>
          Aldeanos: {numPlayers - numWolves - selectedRoles.length}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Personajes especiales:
        </Typography>

        <FormGroup>
          {SPECIAL_ROLES.map((role) => (
            <FormControlLabel
              key={role}
              control={
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                />
              }
              label={role}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={generateRoles}
        >
          Generar distribución
        </Button>
      </Paper>
    </Container>
  );
}
