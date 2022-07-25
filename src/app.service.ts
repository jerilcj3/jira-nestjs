import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  today: string = new Date().toLocaleDateString();
  oneDay: number = 24 * 60 * 60 * 1000;
  statusText: any;
  jql: any =
    'project in (LHSUPPORT, LCR) AND issuetype in (Bug, "Change Request", Clarification) AND status in (Analysed, \
    ANALYZING, Approved, "CLIENT REVIEW", Closed, \
    Confirmed, "DEPLOYING - SIT", "DEPLOYING PRD", \
    "DEPLOYING UAT", ESTIMATED, ESTIMATING, NEGOTIATED, \
    Negotiating, Open, "PRD DEPLOYED", Progressing, RE-OPENED, \
    Released, ResolutionCorrection, Resolved, REVIEWED, Reviewing, \
    "SIT DEPLOYED", "SIT VALIDATED", "UAT DEPLOYED", "UAT VALIDATED", \
    VALIDATING, "Validating SIT", "VALIDATING UAT") order by created DESC';
  objArray: any = [];
  diffInMs: any;
  day: any;
  month: any;
  year: any;
  result: any;
  aux: any;
  dateSplitted: any;

  getData(): any {
    this.objArray = [];
    return this.httpService
      .get(`https://sambaash.atlassian.net/rest/api/3/search?jql=${this.jql}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(
            'info@lithan.com:j020d3PSHIgv16L8zr30F7EE',
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => response.data),
        map((data) => ({
          data: data,
        })),
      );
  }
}
