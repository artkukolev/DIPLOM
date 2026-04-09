import {
  Box,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuditLog } from "../hooks/useAudit";

export const AuditLogPage: React.FC = () => {
  const { data, isLoading } = useAuditLog();

  if (isLoading) return <CircularProgress />;

  const auditEntries = data ?? [];

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        История изменений
      </Typography>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Время</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Действие</TableCell>
              <TableCell>Объект</TableCell>
              <TableCell>Детали</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {new Date(entry.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{entry.actor}</TableCell>
                <TableCell>{entry.action}</TableCell>
                <TableCell>
                  {entry.targetType} {entry.targetId}
                </TableCell>
                <TableCell>{entry.details}</TableCell>
              </TableRow>
            ))}
            {!auditEntries.length && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Нет событий
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
