export interface dashboardDataInterface {
  cowsSlaughtered: number;
  totalCuts: number;
  totalCutsWeight: number;
  liverWeight: number;
  heartWeight: number;
  fatBosh: number;
  fatKidney: number;
  twoKidneysWeight: number;
  twoTesticlesWeight: number;
  graph: {
    time: string;
    weight: number;
  }[];
  table: {
    id: number;
    barcode: string;
    weightIn: number;
    weightOut: number;
    cowType: string;
    workOrder: string;
    store: string;
    status: string;
  }[];
}

export interface vacuumDashboardDataInterface {
  totalPieces: number;
  totalWeight: number;
  doneWorkOrders: number;
  totalWorkOrders: number;
  graph: {
    time: string;
    pieces: number;
  }[];
  table: {
    workOrderCode: string;
    typeOfPiece: string;
    pieceCount: number;
    totalWeight: number;
  }[];
}

export interface cutDashboardDataInterface {
  totalCuts: number;
  cutFurtherCount: number;
  remainingCount: number;
  graph: {
    time: string;
    cuts: number;
  }[];
  table: {
    workOrderCode: string;
    cuttingOrderCode: string;
    cowType: string;
    cutKind: string;
    storeName: string;
    barcode: string;
    weight: number;
    weightOut: number;
  }[];
  totalWeight: number;
  totalWeightOut: number;
  totalLossPercentage: number;
}

export interface allWorkOrdersDataInterface {
  cutsSummary: {
    totalCuts: number;
    totalWeightKg: number;
    totalWeightOutKg: number;
    numberOfCows: number;
    clientName: string;
    supplierName: string;
    cowType: string;
    حلويات: number;
    دبر: number;
    "دهن بوش": number;
    "دهن حلويات": number;
    "دهن دبر": number;
    "دهن كلاوي": number;
    زور: number;
    "عرق دم": number;
    عطم: number;
    قلب: [
      {
        status: string;
        count: number;
        weight: number;
      }
    ];
    كرشه: number;
    كلاوي: number;
    "لحم ابر": number;
    "لحم رقبه": number;
    "لحوم كدمات": number;
    مخاصي: number;
    مفاريم: number;
    ممبار: number;
    "مواسير تصنيع": number;
    نخاع: number;
    "هالك دبحه": number;
    كبد: [
      {
        status: string;
        count: number;
        weight: number;
      }
    ];
  };
  cuttingSummary: {
    totalCutFurther: number;
    totalWeightIn: number;
    totalCutFurtherOut: number;
    totalWeightOut: number;
    "GA لحوم": { in: number; out: number; };
    "GB لحوم": { in: number; out: number; };
    حلويات: { in: number; out: number; };
    "دهن بوش": { in: number; out: number; };
    "دهن كلاوي": { in: number; out: number; };
    "دهون مشفاه": { in: number; out: number; };
    سنم: { in: number; out: number; };
    "عرق دم": { in: number; out: number; };
    "عظام تشافي": { in: number; out: number; };
    "غدد اعدام": { in: number; out: number; };
    غضاريف: { in: number; out: number; };
    قراقيش: { in: number; out: number; };
    كلاوي: { in: number; out: number; };
    كنسه: { in: number; out: number; };
    "لحوم اعدام": { in: number; out: number; };
    "لحوم كدمات": { in: number; out: number; };
    "لحوم مشفاه": { in: number; out: number; };
    "لحوم ناف": { in: number; out: number; };
    مخاصي: { in: number; out: number; };
    نخاع: { in: number; out: number; };
    "ورق حجر": { in: number; out: number; };
    totalVacuumPieces: number;
    totalVacuumWeightKg: number;
  };
  sellingSummary: {
    totalSellCuts: number;
    totalWeightSellKg: number;
    totalSellCutsOut: number;
    totalWeightOutSellKg: number;
    cutsTable: {
      cutType: string;
      weightInKg: number;
      weightOutKg: number;
      barcode: string;
      workOrderCode: string;
      storeName: string;
      cowCode: string;
      cowType: string;
    }[];
  };
  vacuumSellSummary: {
    pieceName: string;
    count: number;
    totalWeightKg: number;
  }[];
}

export interface slaughterWorkOrderDataInterface {
  totalCuts: number;
  totalWeightKg: number;
  totalWeightOutKg: number;
  numberOfCows: number;
  clientName: string;
  supplierName: string;
  cowType: string;
  حلويات: number;
  دبر: number;
  "دهن بوش": number;
  "دهن حلويات": number;
  "دهن دبر": number;
  "دهن كلاوي": number;
  زور: number;
  "عرق دم": number;
  عطم: number;
  قلب: [
    {
      status: string;
      count: number;
      weight: number;
    }
  ];
  كبده: number;
  كرشه: number;
  كلاوي: number;
  "لحم ابر": number;
  "لحم رقبه": number;
  "لحوم كدمات": number;
  مخاصي: number;
  مفاريم: number;
  ممبار: number;
  "مواسير تصنيع": number;
  نخاع: number;
  "هالك دبحه": number;
  كبد: [
    {
      status: string;
      count: number;
      weight: number;
    }
  ];
  totalWeightOfOrder: number;
}

export interface cuttingWorkOrderDataInterface {
  totalCutFurther: number;
  totalWeightIn: number;
  totalCutFurtherOut: number;
  totalWeightOut: number;
  "GA لحوم": number;
  "GB لحوم": number;
  حلويات: number;
  "دهن بوش": number;
  "دهن كلاوي": number;
  "دهون مشفاه": number;
  سنم: number;
  "عرق دم": number;
  "عظام تشافي": number;
  "غدد اعدام": number;
  غضاريف: number;
  قراقيش: number;
  كلاوي: number;
  كنسه: number;
  "لحوم اعدام": number;
  "لحوم كدمات": number;
  "لحوم مشفاه": number;
  "لحوم ناف": number;
  مخاصي: number;
  نخاع: number;
  "ورق حجر": number;
  totalVacuumPieces: number;
  totalVacuumWeightKg: number;
  totalWeightOfOrder: number;
}

export interface sellingWorkOrderDataInterface {
  totalSellCuts: number;
  totalWeightSellKg: number;
  totalSellCutsOut: number;
  totalWeightOutSellKg: number;
  cutsTable: {
    cutType: string;
    weightInKg: number;
    weightOutKg: number;
    barcode: string;
    workOrderCode: string;
    storeName: string;
    cowCode: string;
    cowType: string;
  }[];
}

export interface receiptWorkOrderDataInterface {
  clientName: string;
  supplierName: string;
  cowType: string;
  cowCount: number;
  cows: {
    cowCode: string;
    weightSell: number;
  }[];
}

export interface miscouragesDataInterface {
  orderCode: string;
  miscourages: {
    miscourageName: string;
    weightKg: number;
    parnekaWeightKg: number;
    status: string;
    barcode: string;
  }[];
}

export interface vacuumSellingWorkOrderDataInterface {
  orderCode: string;
  clientName: string;
  date: string;
  totalPiecesCount: number;
  totalPiecesWeight: number;
  cowTypes: {
    cowType: string;
    totalWeightKg: number;
  }[];
  pieces: {
    typeOfPiece: string;
    count: number;
    totalWeight: number;
    cowType: string;
  }[];
}

export interface vacuumSellingWorkOrderPieceDataInterface {
  weightKg: number;
  barcode: string;
  orderCode: string;
}

export interface clientsDataInterface {
  name: string;
  id: string;
}

export interface clientVacuumPiecesDataInterface {
  typeOfPiece: string;
  cowType: string;
  count: number;
  totalWeight: number;
  pieces: {
    barcode: string;
    workOrder: string;
    weight: number;
    date: string;
  }[];
}

export interface createClientSupplierData {
  name: string;
  code: string;
}

export interface makingOrdersByDateData {
  clientName: string;
  orderCode: string;
  totalCount: number;
  totalWeightKg: number;
}

export interface makingOrdersOrderData {
  cowType: string;
  totalCount: number;
  totalWeightKg: number;
}

export interface makingOrderByCowTypeData {
  count: number;
  pieceType: string;
  pieces: {
    barcode: string;
    batchNumber: string;
    grossWeight: number;
    netWeight: number;
  }[];
  totalWeightKg: number;
}
