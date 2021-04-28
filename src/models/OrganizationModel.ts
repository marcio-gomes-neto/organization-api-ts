import { model } from "mongoose";
import { IOrganization, IOrganizationDocument } from "./OrganizationTypes";
import OrganizationSchema from "./OrganizationEntity";
const OrganizationModel = model<IOrganizationDocument>("organization", OrganizationSchema);

export default OrganizationModel;