import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api/mockDb";
import { useAuthStore } from "../store/authStore";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await api.login(email);
      login(user);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" mb={2} component="h1">
            Вход в систему
          </Typography>
          <Typography variant="body2" mb={2}>
            Используйте email (admin@example.com, teacher@example.com,
            parent@example.com и т.п.)
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              required
              id="email"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              autoFocus
            />
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Загрузка..." : "Войти"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
