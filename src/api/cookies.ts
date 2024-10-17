export function setCookie(cName: string, cValue: string, exDays: number) {
  const time = new Date();
  time.setTime(time.getTime() + exDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${time.toUTCString()}`;
  document.cookie = `${cName}=${cValue};${expires};path=/;SameSite=Strict`;
}

export function getCookie(cName: string) {
  const name = `${cName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const slice = decodedCookie.split(";");
  for (let i = 0; i < slice.length; i++) {
    let deleteSlice = slice[i];
    while (deleteSlice.charAt(0) === " ") {
		deleteSlice = deleteSlice.substring(1);
    }
    if (deleteSlice.indexOf(name) === 0) {
      return deleteSlice.substring(name.length, deleteSlice.length);
    }
  }
  return "";
}

export function deleteCookie(cName: string) {
  setCookie(cName, "", -1);
}
