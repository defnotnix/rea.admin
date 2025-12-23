import { createProblem, updateProblem } from "../../module.api";

export const formModule = {
  onSubmit: async (data: any, formType: "create" | "update", id?: string) => {
    try {
      if (formType === "create") {
        return await createProblem(data);
      } else if (formType === "update" && id) {
        return await updateProblem(id, data);
      }
    } catch (error) {
      throw error;
    }
  },
};
