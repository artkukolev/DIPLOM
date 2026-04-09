import { Container, Typography } from "@mui/material";

export const UnauthorizedPage: React.FC = () => (
  <Container sx={{ mt: 8 }}>
    <Typography variant="h4">Доступ запрещён</Typography>
    <Typography sx={{ mt: 2 }}>
      У вас нет прав для просмотра этой страницы.
    </Typography>
  </Container>
);
