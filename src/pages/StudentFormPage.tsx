import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStudents, useUpsertStudent } from "../hooks/useStudents";
import type { Student } from "../types";
import { useAuthStore } from "../store/authStore";

const schema = z.object({
  fullName: z.string().min(3, "Введите ФИО"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Формат YYYY-MM-DD"),
  className: z.string().min(1),
  parentContacts: z.string().min(5),
  status: z.enum(["active", "transferred", "expelled", "archived"]),
  enrollmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  medicalNotes: z.string().optional(),
  benefits: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const StudentFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: students, isLoading } = useStudents();
  const user = useAuthStore((s) => s.user);
  const upsert = useUpsertStudent();
  const navigate = useNavigate();

  const existingStudent = useMemo(
    () => students?.find((s) => s.id === id),
    [students, id],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      className: "",
      parentContacts: "",
      status: "active",
      enrollmentDate: "",
      medicalNotes: "",
      benefits: "",
    },
  });

  useEffect(() => {
    if (existingStudent) {
      setValue("fullName", existingStudent.fullName);
      setValue("birthDate", existingStudent.birthDate);
      setValue("className", existingStudent.className);
      setValue("parentContacts", existingStudent.parentContacts);
      setValue("status", existingStudent.status);
      setValue("enrollmentDate", existingStudent.enrollmentDate);
      setValue("medicalNotes", existingStudent.medicalNotes);
      setValue("benefits", existingStudent.benefits);
    }
  }, [existingStudent, setValue]);

  const onSubmit = async (values: FormValues) => {
    const instance: Student = {
      id: existingStudent?.id ?? `s_${Date.now()}`,
      fullName: values.fullName,
      birthDate: values.birthDate,
      className: values.className,
      parentContacts: values.parentContacts,
      status: values.status,
      enrollmentDate: values.enrollmentDate,
      grades: existingStudent?.grades ?? {},
      attendance: existingStudent?.attendance ?? [],
      medicalNotes: values.medicalNotes ?? "",
      benefits: values.benefits ?? "",
      documents: existingStudent?.documents ?? [],
      avatar: existingStudent?.avatar ?? "",
    };

    await upsert.mutateAsync({
      student: instance,
      actor: user?.name ?? "system",
    });
    navigate("/students");
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Typography variant="h5" mb={2}>
        {existingStudent ? "Редактирование ученика" : "Новый ученик"}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        display="grid"
        gap={2}
      >
        <TextField
          label="ФИО"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <TextField
          label="Дата рождения"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("birthDate")}
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
        />
        <TextField
          label="Класс"
          {...register("className")}
          error={!!errors.className}
          helperText={errors.className?.message}
        />
        <TextField
          label="Контакты родителей"
          {...register("parentContacts")}
          error={!!errors.parentContacts}
          helperText={errors.parentContacts?.message}
        />
        <TextField
          label="Дата поступления"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("enrollmentDate")}
          error={!!errors.enrollmentDate}
          helperText={errors.enrollmentDate?.message}
        />
        <TextField
          label="Мед. заметки"
          {...register("medicalNotes")}
          error={!!errors.medicalNotes}
          helperText={errors.medicalNotes?.message}
        />
        <TextField
          label="Льготы"
          {...register("benefits")}
          error={!!errors.benefits}
          helperText={errors.benefits?.message}
        />
        <TextField
          label="Статус"
          select
          SelectProps={{ native: true }}
          {...register("status")}
          error={!!errors.status}
          helperText={errors.status?.message}
        >
          <option value="active">активный</option>
          <option value="transferred">переведён</option>
          <option value="expelled">отчислен</option>
          <option value="archived">архив</option>
        </TextField>
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {existingStudent ? "Сохранить" : "Создать"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/students")}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
