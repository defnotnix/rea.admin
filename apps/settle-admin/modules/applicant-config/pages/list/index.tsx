"use client";

import { DataTableWrapper } from "@settle/core";
import { ConfigShell } from "@settle/admin";

import {
  getApplicantConfigs,
  createApplicantConfig,
  updateApplicantConfig,
  deleteApplicantConfig,
} from "../../module.api";
import { moduleInfo, configFields, applicantConfigSchema } from "../../module.config";

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <DataTableWrapper
      queryKey="applicant-config.list"
      queryGetFn={getApplicantConfigs}
      dataKey="results"
    >
      <ConfigShell
        moduleInfo={moduleInfo}
        bread={moduleInfo.bread}
        fields={configFields}
        idAccessor="id"
        onCreateApi={createApplicantConfig}
        onEditApi={updateApplicantConfig}
        onDeleteApi={deleteApplicantConfig}
        searchPlaceholder="Search configs..."
        emptyStateMessage="No applicant configurations found. Create one to get started."
        validator={applicantConfigSchema}
      />
    </DataTableWrapper>
  );
}
