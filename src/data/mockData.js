// HIS Clinical Engineering — Mock Data
// All values based on Loading Time = 720 hours/month
// Formulas: Availability = UpTime/720, PerfEff = OpTime/UpTime,
//           λ = DownTime/720, MTBF = 1/λ

export const LOADING_TIME = 720;

export const equipment = [
  { id:1, name:"Ventilator", department:"ICU", status:"Operational", upTime:688, downTime:32, operatingTime:610, standbyTime:78, availability:95.6, performanceEfficiency:88.7, failureRate:0.044, mtbf:22.5, maintenanceLevel:"Organizational" },
  { id:2, name:"ECG Machine", department:"Cardiology", status:"Operational", upTime:700, downTime:20, operatingTime:650, standbyTime:50, availability:97.2, performanceEfficiency:92.9, failureRate:0.028, mtbf:36.0, maintenanceLevel:"Organizational" },
  { id:3, name:"Defibrillator", department:"Emergency", status:"Under Maintenance", upTime:600, downTime:120, operatingTime:520, standbyTime:80, availability:83.3, performanceEfficiency:86.7, failureRate:0.167, mtbf:6.0, maintenanceLevel:"Intermediate" },
  { id:4, name:"Infusion Pump", department:"Surgery", status:"Operational", upTime:710, downTime:10, operatingTime:690, standbyTime:20, availability:98.6, performanceEfficiency:97.2, failureRate:0.014, mtbf:72.0, maintenanceLevel:"Organizational" },
  { id:5, name:"Patient Monitor", department:"General Ward", status:"Operational", upTime:695, downTime:25, operatingTime:640, standbyTime:55, availability:96.5, performanceEfficiency:92.1, failureRate:0.035, mtbf:28.8, maintenanceLevel:"Organizational" },
  { id:6, name:"X-Ray Machine", department:"Radiology", status:"Operational", upTime:660, downTime:60, operatingTime:580, standbyTime:80, availability:91.7, performanceEfficiency:87.9, failureRate:0.083, mtbf:12.0, maintenanceLevel:"Intermediate" },
  { id:7, name:"Ultrasound Scanner", department:"Radiology", status:"Under Maintenance", upTime:580, downTime:140, operatingTime:500, standbyTime:80, availability:80.6, performanceEfficiency:86.2, failureRate:0.194, mtbf:5.1, maintenanceLevel:"Intermediate" },
  { id:8, name:"Anesthesia Machine", department:"Surgery", status:"Operational", upTime:705, downTime:15, operatingTime:660, standbyTime:45, availability:97.9, performanceEfficiency:93.6, failureRate:0.021, mtbf:48.0, maintenanceLevel:"Organizational" },
  { id:9, name:"Pulse Oximeter", department:"ICU", status:"Operational", upTime:715, downTime:5, operatingTime:700, standbyTime:15, availability:99.3, performanceEfficiency:97.9, failureRate:0.007, mtbf:144.0, maintenanceLevel:"Organizational" },
  { id:10, name:"MRI Scanner", department:"Radiology", status:"Out of Service", upTime:480, downTime:240, operatingTime:400, standbyTime:80, availability:66.7, performanceEfficiency:83.3, failureRate:0.333, mtbf:3.0, maintenanceLevel:"Depot" },
];

export const workOrders = [
  { id:"WO-001", equipment:"MRI Scanner", department:"Radiology", type:"Corrective", priority:"High", status:"In Progress", dateReported:"2026-04-20", assignedTo:"Ahmed K.", daysOpen:6 },
  { id:"WO-002", equipment:"Defibrillator", department:"Emergency", type:"Corrective", priority:"High", status:"Pending", dateReported:"2026-04-22", assignedTo:"Sara M.", daysOpen:4 },
  { id:"WO-003", equipment:"Ultrasound Scanner", department:"Radiology", type:"Corrective", priority:"Medium", status:"In Progress", dateReported:"2026-04-18", assignedTo:"Omar F.", daysOpen:8 },
  { id:"WO-004", equipment:"X-Ray Machine", department:"Radiology", type:"Preventive (PM)", priority:"Low", status:"Completed", dateReported:"2026-04-10", assignedTo:"Ahmed K.", daysOpen:0 },
  { id:"WO-005", equipment:"Ventilator", department:"ICU", type:"Preventive (PM)", priority:"Medium", status:"Scheduled", dateReported:"2026-04-28", assignedTo:"Sara M.", daysOpen:0 },
  { id:"WO-006", equipment:"ECG Machine", department:"Cardiology", type:"Corrective", priority:"Low", status:"Completed", dateReported:"2026-04-08", assignedTo:"Omar F.", daysOpen:0 },
];

export const ipmSchedule = [
  { id:"IPM-001", equipment:"Anesthesia Machine", department:"Surgery", frequency:"Monthly", lastDone:"2026-03-25", nextDue:"2026-04-25", status:"Overdue", assignedTo:"Ahmed K." },
  { id:"IPM-002", equipment:"Defibrillator", department:"Emergency", frequency:"Quarterly", lastDone:"2026-02-10", nextDue:"2026-05-10", status:"Upcoming", assignedTo:"Sara M." },
  { id:"IPM-003", equipment:"Ventilator", department:"ICU", frequency:"Monthly", lastDone:"2026-03-30", nextDue:"2026-04-30", status:"Upcoming", assignedTo:"Omar F." },
  { id:"IPM-004", equipment:"Patient Monitor", department:"General Ward", frequency:"Semi-Annual", lastDone:"2025-11-01", nextDue:"2026-05-01", status:"Upcoming", assignedTo:"Ahmed K." },
  { id:"IPM-005", equipment:"X-Ray Machine", department:"Radiology", frequency:"Quarterly", lastDone:"2026-01-15", nextDue:"2026-04-15", status:"Overdue", assignedTo:"Sara M." },
  { id:"IPM-006", equipment:"Infusion Pump", department:"Surgery", frequency:"Annual", lastDone:"2025-04-01", nextDue:"2026-04-01", status:"Completed", assignedTo:"Omar F." },
  { id:"IPM-007", equipment:"ECG Machine", department:"Cardiology", frequency:"Semi-Annual", lastDone:"2026-01-20", nextDue:"2026-07-20", status:"Upcoming", assignedTo:"Ahmed K." },
  { id:"IPM-008", equipment:"MRI Scanner", department:"Radiology", frequency:"Quarterly", lastDone:"2026-02-01", nextDue:"2026-05-01", status:"Upcoming", assignedTo:"Sara M." },
];

export const kpiSummary = {
  totalEquipment: 10,
  operational: 7,
  underMaintenance: 2,
  outOfService: 1,
  avgAvailability: 90.7,
  avgMTBF: 37.7,
  openWorkOrders: 4,
  overdueIPMs: 2,
  ipmCompletionRate: 78,
};
