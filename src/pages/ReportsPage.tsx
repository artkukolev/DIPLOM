import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useMemo } from "react";
import { useStudents, useGroups } from "../hooks/useStudents";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const exportExcel = (students: any[]) => {
  const header = Object.keys(students[0] || {}).join("\t");
  const rows = students
    .map((item) => Object.values(item).join("\t"))
    .join("\n");
  const blob = new Blob([header + "\n" + rows], {
    type: "application/vnd.ms-excel",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "students-report.xls";
  link.click();
  URL.revokeObjectURL(url);
};

const exportPdf = async (students: any[]) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const title = "Отчёт по ученикам";
  page.drawText(title, {
    x: 40,
    y: 720,
    size: 20,
    font,
    color: rgb(0.1, 0.1, 0.4),
  });
  let y = 690;
  page.drawText("Краткая информация по студентам:", {
    x: 40,
    y,
    size: 12,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 22;

  students.slice(0, 12).forEach((student, index) => {
    const line = `${index + 1}. ${student.fullName} — ${student.className} — ${student.status}`;
    page.drawText(line, {
      x: 40,
      y,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 16;
    if (y < 60) {
      y = 720;
      pdfDoc.addPage([600, 750]);
    }
  });

  const pdfBytes = await pdfDoc.save();
  const pdfArray = new Uint8Array(pdfBytes);
  const blob = new Blob([pdfArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "student-report.pdf";
  link.click();
  URL.revokeObjectURL(url);
};

export const ReportsPage: React.FC = () => {
  const { data: students, isLoading } = useStudents();
  const { data: groups } = useGroups();

  const summary = useMemo(() => {
    const total = students?.length ?? 0;
    const active =
      students?.filter((item) => item.status === "active").length ?? 0;
    const withNeeds =
      students?.filter((item) => item.specialNeeds !== "нет").length ?? 0;
    return { total, active, withNeeds };
  }, [students]);

  if (isLoading) {
    return <div className="text-gray-600">Загрузка отчётов...</div>;
  }

  const dataForExport = (students ?? []).map((student) => ({
    ФИО: student.fullName,
    Класс: student.className,
    Группа: groups?.find((group) => group.id === student.groupId)?.name ?? "—",
    Статус: student.status,
    Льготы: student.benefits,
    ОВЗ: student.specialNeeds,
    Компетенции: student.competencies.join(", "),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
          📈 Модуль отчётов
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Формируйте табличные и PDF отчёты по группе, успеваемости и портфолио.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Всего учеников
          </p>
          <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
            {summary.total}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Активные
          </p>
          <p className="mt-4 text-4xl font-bold text-emerald-600 dark:text-emerald-300">
            {summary.active}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            ОВЗ / особые нужды
          </p>
          <p className="mt-4 text-4xl font-bold text-orange-600 dark:text-orange-300">
            {summary.withNeeds}
          </p>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Экспорт отчётов
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Создавайте Excel и PDF отчёты для руководства и анализа.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => exportExcel(dataForExport)}
            >
              📥 Экспорт Excel
            </Button>
            <Button
              variant="secondary"
              onClick={() => exportPdf(dataForExport)}
            >
              📄 Экспорт PDF
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
