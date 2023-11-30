import { BenefitAnalysisModel } from '@app/models/myoffice/benefit/benefit-analysis.module';
import { createAction, props } from '@ngrx/store';


// search
export const searchBenefitAnalysis = createAction(
  "[Benefit API] search benefit analysis",
  props<{ params: any }>()
);

export const searchBenefitAnalysisSuccess = createAction(
  "[Benefit API] search benefit analysis success",
  props<{ benefit: BenefitAnalysisModel[] }>()
);

export const searchBenefitAnalysisFailure = createAction(
  "[Benefit API] search benefit analysis failure",
  props<{ msg: any }>()
);

// sum
export const sumBenefitAnalysis = createAction(
    "[Benefit API] sum benefit analysis",
    props<{ params: any }>()
  );
  
export const sumBenefitAnalysisSuccess = createAction(
"[Benefit API] sum benefit analysis success",
props<{ benefit: BenefitAnalysisModel }>()
);

export const sumBenefitAnalysisFailure = createAction(
"[Benefit API] sum benefit analysis failure",
props<{ msg: any }>()
);

// chart1
export const getChart1 = createAction(
"[Benefit API] get chart1 ",
props<{ params: any }>()
);

export const getChart1Success = createAction(
"[Benefit API] get chart1 success",
props<{ benefit: BenefitAnalysisModel[] }>()
);

export const getChart1Failure = createAction(
"[Benefit API] get chart1 failure",
props<{ msg: any }>()
);

// chart2
export const getChart3 = createAction(
"[Benefit API] get chart3 ",
props<{ params: any }>()
);

export const getChart3Success = createAction(
"[Benefit API] get chart3 success",
props<{ benefit: BenefitAnalysisModel[] }>()
);

export const getChart3Failure = createAction(
"[Benefit API] get chart3 failure",
props<{ msg: any }>()
);