let scormAPI = null;

export function initSCORM() {
  scormAPI = window.API || window.parent.API;

  if (scormAPI) {
    scormAPI.LMSInitialize("");
  }
}

// ✅ Set Score
export function setScore(score) {
  if (!scormAPI) return;

  scormAPI.LMSSetValue("cmi.core.score.raw", score.toString());
}

// ✅ Set Status (completed / incomplete / passed)
export function setStatus(status) {
  if (!scormAPI) return;

  scormAPI.LMSSetValue("cmi.core.lesson_status", status);
}

// ✅ Track current screen/location
export function setLocation(location) {
  if (!scormAPI) return;

  scormAPI.LMSSetValue("cmi.core.lesson_location", location);
}

// ✅ Save resume data
export function setSuspendData(data) {
  if (!scormAPI) return;

  scormAPI.LMSSetValue("cmi.suspend_data", JSON.stringify(data));
}

// ✅ Get resume data (NEW - IMPORTANT)
export function getSuspendData() {
  if (!scormAPI) return null;

  const data = scormAPI.LMSGetValue("cmi.suspend_data");
  return data ? JSON.parse(data) : null;
}

// ✅ Commit data to LMS
export function commitSCORM() {
  if (!scormAPI) return;

  scormAPI.LMSCommit("");
}

// ✅ Finish session
export function finishSCORM() {
  if (!scormAPI) return;

  scormAPI.LMSFinish("");
}