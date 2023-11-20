import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import {
  BigCategoryInterface,
  MiddleCategoryInterface,
} from "../models/interfaces/interfaces.ts";
import { ListDivider } from "@mui/joy";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  category: BigCategoryInterface | null;
};

const CategoryNavbarPopover: React.FC<Props> = ({
  open,
  anchorEl,
  onClose,
  category,
}) => {
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              <a href="#">{category?.title}</a>
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            {(category?.data?.length || 0) > 0 &&
              category?.data.map(
                (smcategory: MiddleCategoryInterface, index: number) => (
                  <>
                    {console.log(smcategory?.data?.length, index)}
                    <Grid
                      item
                      key={smcategory?.code}
                      xs={11.5 / (category.data.length || 1)}
                      justifyContent={"center"}
                      justifyItems={"center"}
                      textAlign={"center"}
                    >
                      {smcategory.title}
                    </Grid>
                    {index !== category.data.length - 1 && (
                      <ListDivider sx={{ margin: 0, padding: 0 }} />
                    )}
                  </>
                )
              )}
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default CategoryNavbarPopover;
