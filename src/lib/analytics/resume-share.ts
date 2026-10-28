type ShareServices = {
  share?: (data: ShareData) => Promise<void>;
  copy?: (text: string) => Promise<void>;
};
/** A share event means the native flow completed or the link was actually copied. */
export async function shareResume(
  url: string,
  services: ShareServices,
): Promise<"shared" | "copied" | "cancelled"> {
  if (services.share) {
    try {
      await services.share({ title: "Shweta Sharma — Résumé", url });
      return "shared";
    } catch (error) {
      if ((error as Error).name === "AbortError") return "cancelled";
      throw error;
    }
  }
  if (!services.copy)
    throw Error(
      "Sharing is unavailable. You can copy the address from your browser.",
    );
  await services.copy(url);
  return "copied";
}
