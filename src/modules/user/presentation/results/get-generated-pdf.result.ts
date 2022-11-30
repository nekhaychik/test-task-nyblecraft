import { Status } from '../../core';

export class GetGeneratedPdfResult {
  status: Status;
  data: {
    pdfPath: string;
  };
}
