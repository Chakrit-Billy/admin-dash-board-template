import React, { useState, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Pagination from "@mui/material/Pagination"; // Import Material-UI Pagination
import Stack from "@mui/material/Stack"; // Import Material-UI Stack for pagination container

const statusColors = {
  รอตรวจสอบ: "warning",
  พิจารณาเอกสาร: "info",
  ขึ้นทะเบียน: "success",
  ออกเอกสาร: "primary",
  "แก้ไข ครั้งที่ 1.1": "secondary",
  "แก้ไข ครั้งที่ 1.2": "secondary",
  "ตอบกลับการแก้ไข 1.1": "danger",
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://test-api-py77dwlbxa-df.a.run.app/data"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function OrderTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    fetchData().then((fetchedData) => setData(fetchedData));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getFilteredRows = (rows, query) => {
    if (!query) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredRows = getFilteredRows(data, searchQuery);

  // Calculate current rows to display based on page and rowsPerPage
  const currentRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Add your filter options here */}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <Input
            size="sm"
            placeholder="ค้นหา"
            startDecorator={<SearchIcon />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </FormControl>
        {/* Add your filter options here */}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
          mx: "auto", // Center the table horizontally
          textAlign: "center", // Center-align text in the table
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground": "#f5f5f5",
            "--TableCell-bodyBackground": "#ffffff",
            "--TableCell-border": "1px solid #e0e0e0",
            borderRadius: "sm",
            "& th": {
              fontWeight: 600,
              color: "#333",
              textAlign: "center",
              padding: "12px",
              borderBottom: "2px solid #ddd",
            },
            "& td": {
              padding: "12px",
              borderBottom: "1px solid #eee",
            },
            "& tr:nth-of-type(even)": {
              backgroundColor: "#f9f9f9",
            },
            "& tr:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <thead>
            <tr>
              <th>ชื่อหน่วยงาน</th>
              <th>รหัสหน่วยบริการ</th>
              <th>วันที่ขึ้นทะเบียน</th>
              <th>ชื่อผู้ช่วยตรวจสอบ</th>
              <th>วันที่ตรวจสอบ</th>
              <th>สถานะ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.code}</td>
                <td>{row.createDate}</td>
                <td>{row.verifyBy}</td>
                <td>{row.verifyDate}</td>
                <td>
                  <Chip
                    variant="soft"
                    color={statusColors[row.status] || "default"}
                    sx={{
                      fontWeight: 500,
                      textTransform: "capitalize",
                      padding: "4px 8px",
                    }}
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <RowMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Stack
          spacing={2}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        ></Stack>
      </Sheet>
    </React.Fragment>
  );
}

function RowMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Dropdown>
      <MenuButton
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ minWidth: 0, p: 0 }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: 2 }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}
