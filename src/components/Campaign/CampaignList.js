import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./CampaignList.module.css";

const CampaignList = ({ campaigns = [] }) => {
  const badgeStyle = (isActive) => {
    if (isActive) {
      return classes["badge-active"];
    }
    return classes["badge-inactive"];
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "rgb(180, 230, 247)",
            borderTop: "1px solid #A9A9A9",
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Budget</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow
              key={campaign.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {campaign.name}
              </TableCell>
              <TableCell>{campaign.username}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>
                <span
                  className={`${classes.badge}  ${badgeStyle(
                    campaign.isActive
                  )}`}
                >
                  {campaign.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell>{campaign.budget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignList;
