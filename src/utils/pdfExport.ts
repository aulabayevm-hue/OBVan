import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { EquipmentItem } from '../types/equipment';

/**
 * Creates a clean HTML printable passport DOM element for PDF rendering.
 * Uses html2canvas + jsPDF so Cyrillic Russian text and images render properly.
 */
async function renderElementToPDF(element: HTMLElement, fileName: string) {
  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(element);
  }
}

/**
 * Exports PDF documentation passport for a single equipment item.
 */
export async function exportSingleEquipmentPDF(item: EquipmentItem) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.padding = '30px';
  container.style.boxSizing = 'border-box';
  container.style.color = '#1e293b';

  // Generate QR Code URL via Google Chart API or QR SVG for PDF element
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    JSON.stringify({ id: item.id, inv: item.inventoryNumber, model: item.model })
  )}`;

  container.innerHTML = `
    <div style="border: 2px solid #0f172a; padding: 20px; border-radius: 8px;">
      <!-- Document Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 20px; margin: 0; color: #0f172a; text-transform: uppercase; font-weight: bold;">
            ПАСПОРТ ОБОРУДОВАНИЯ
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
            Система учета оборудования | Документ сгенерирован ${new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 14px; font-weight: bold; background-color: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 4px;">
            ID: ${item.id}
          </span>
        </div>
      </div>

      <!-- Main Info & Photo Block -->
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <!-- Left: Details Table -->
        <div style="flex: 1;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; width: 40%; border-bottom: 1px solid #f1f5f9;">Наименование:</td>
              <td style="padding: 6px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Бренд и Модель:</td>
              <td style="padding: 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.brand} ${item.model}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Категория:</td>
              <td style="padding: 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.category}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Инвентарный №:</td>
              <td style="padding: 6px; font-family: monospace; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.inventoryNumber}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Серийный №:</td>
              <td style="padding: 6px; font-family: monospace; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.serialNumber}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Место хранения:</td>
              <td style="padding: 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${item.storageLocation}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Текущий статус:</td>
              <td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">${item.status}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Неисправность:</td>
              <td style="padding: 6px; color: ${item.fault !== 'Нет' ? '#b91c1c' : '#059669'}; font-weight: bold; border-bottom: 1px solid #f1f5f9;">
                ${item.fault}
              </td>
            </tr>
          </table>
        </div>

        <!-- Right: Photo & QR -->
        <div style="width: 220px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
          <div style="width: 100%; height: 140px; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; background-color: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="${item.photoUrl}" style="max-width: 100%; max-height: 100%; object-fit: cover;" />
          </div>
          <div style="border: 1px solid #0f172a; padding: 6px; border-radius: 6px; background: #fff; text-align: center;">
            <img src="${qrUrl}" style="width: 100px; height: 100px;" />
            <div style="font-size: 9px; font-family: monospace; margin-top: 2px;">QR Идентификатор</div>
          </div>
        </div>
      </div>

      <!-- Technical Specifications (AI) -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 13px; text-transform: uppercase; margin: 0 0 8px 0; color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
          Технические характеристики (ИИ):
        </h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; font-size: 11px; font-family: monospace; line-height: 1.5; white-space: pre-wrap;">${item.aiSpecs}</div>
      </div>

      <!-- Usage History Table -->
      <div>
        <h3 style="font-size: 13px; text-transform: uppercase; margin: 0 0 8px 0; color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
          История эксплуатации и выездов:
        </h3>
        ${
          item.usageHistory.length === 0
            ? '<p style="font-size: 11px; color: #94a3b8; font-style: italic;">Записи об эксплуатации отсутствуют.</p>'
            : `
          <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: left;">
            <thead>
              <tr style="background-color: #f1f5f9; color: #334155;">
                <th style="padding: 6px; border: 1px solid #cbd5e1;">Дата выезда</th>
                <th style="padding: 6px; border: 1px solid #cbd5e1;">Мероприятие / Объект</th>
                <th style="padding: 6px; border: 1px solid #cbd5e1;">OB Van №</th>
                <th style="padding: 6px; border: 1px solid #cbd5e1;">Ответственный</th>
                <th style="padding: 6px; border: 1px solid #cbd5e1;">Выдача</th>
                <th style="padding: 6px; border: 1px solid #cbd5e1;">Возврат</th>
              </tr>
            </thead>
            <tbody>
              ${item.usageHistory
                .map(
                  (h) => `
                <tr>
                  <td style="padding: 5px; border: 1px solid #e2e8f0; font-weight: bold;">${h.departureDate}</td>
                  <td style="padding: 5px; border: 1px solid #e2e8f0;">${h.eventOrObject}</td>
                  <td style="padding: 5px; border: 1px solid #e2e8f0;">${h.obVanNumber}</td>
                  <td style="padding: 5px; border: 1px solid #e2e8f0;">${h.responsibleEmployee}</td>
                  <td style="padding: 5px; border: 1px solid #e2e8f0;">${h.issueDate}</td>
                  <td style="padding: 5px; border: 1px solid #e2e8f0;">${h.returnDate}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        `
        }
      </div>
    </div>
  `;

  await renderElementToPDF(container, `Passport_${item.inventoryNumber}.pdf`);
}

/**
 * Exports full PDF documentation list for multiple/all equipment items.
 */
export async function exportEquipmentListPDF(items: EquipmentItem[], title: string = 'Отчет по оборудованию') {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = '1000px';
  container.style.backgroundColor = '#ffffff';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.padding = '30px';
  container.style.boxSizing = 'border-box';
  container.style.color = '#1e293b';

  container.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 22px; margin: 0; color: #0f172a; text-transform: uppercase; font-weight: bold;">${title}</h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
            Всего наименований: ${items.length} | Сформировано: ${new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: left;">
        <thead>
          <tr style="background-color: #0f172a; color: #ffffff;">
            <th style="padding: 8px; border: 1px solid #334155;">Категория</th>
            <th style="padding: 8px; border: 1px solid #334155;">Наименование</th>
            <th style="padding: 8px; border: 1px solid #334155;">Модель</th>
            <th style="padding: 8px; border: 1px solid #334155;">Инвентарный №</th>
            <th style="padding: 8px; border: 1px solid #334155;">Серийный №</th>
            <th style="padding: 8px; border: 1px solid #334155;">Место хранения</th>
            <th style="padding: 8px; border: 1px solid #334155;">Статус</th>
            <th style="padding: 8px; border: 1px solid #334155;">Неисправность</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item, idx) => `
            <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="padding: 6px; border: 1px solid #cbd5e1; font-weight: bold;">${item.category}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1; font-weight: bold;">${item.name}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1;">${item.brand} ${item.model}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1; font-family: monospace;">${item.inventoryNumber}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1; font-family: monospace;">${item.serialNumber}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1;">${item.storageLocation}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1; font-weight: bold;">${item.status}</td>
              <td style="padding: 6px; border: 1px solid #cbd5e1; color: ${item.fault !== 'Нет' ? '#b91c1c' : '#475569'};">${item.fault}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;

  await renderElementToPDF(container, `Equipment_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
