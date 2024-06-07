

export async function getAlerts() {
  try {
    const result = await fetch("../json/alerts.json");
    if(!result.ok) {
      throw new Error ("Problem fetching alerts")
    }
    const data = await result.json();
    return data;

  }catch (error) {
    return; // No current alerts no error
  }
}

export async function buildAlerts() {
  const alerts = await getAlerts();
  try {
      if (alerts.length > 0) {
        let alertCard = `<section id="alertSection" class="alert-list">`;
        for (let alert of alerts){
          alertCard += `<p style="background: ${alert.background}; color: ${alert.color}" >${alert.message}</p>`
        }
        alertCard += `</section>`
        const mainEl = document.querySelector("main");
         mainEl.insertAdjacentHTML("afterbegin", alertCard);
         return
      }

  } catch (error) {
  return; // No current alerts no error

  }
}

function alertTemplate(item) {
  return `<se`
}

