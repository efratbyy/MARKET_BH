import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import {
  BigCategoryInterface,
  MiddleCategoryInterface,
  SmallCategoryInterface,
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
            <Typography>{category?.title}</Typography>
          </Grid>

          <Grid container item>
            {(category?.data?.length || 0) > 0 &&
              category?.data.map(
                (mdCategory: MiddleCategoryInterface, index: number) => (
                  <>
                    <Grid
                      item
                      container
                      key={mdCategory?.code}
                      xs={11.5 / (category.data.length || 1)}
                      justifyContent={"center"}
                      justifyItems={"center"}
                      textAlign={"center"}
                    >
                      {mdCategory.title}

                      <Grid container item xs={12}>
                        {(category?.data?.length || 0) > 0 &&
                          mdCategory?.data?.map(
                            (
                              smCategory: SmallCategoryInterface,
                              index: number
                            ) => (
                              <Grid item xs={12}>
                                {smCategory.title}
                              </Grid>
                            )
                          )}
                      </Grid>
                    </Grid>
                    {category.data.length - 1 !== index && (
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
