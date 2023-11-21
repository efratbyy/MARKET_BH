import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, Divider, Grid } from "@mui/material";
import {
  BigCategoryInterface,
  MiddleCategoryInterface,
  SmallCategoryInterface,
} from "../models/interfaces/interfaces.ts";
import { ListDivider } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearch] = useSearchParams();

  const handleCategoryClick = (categoryCode: string) => {
    setSearch({
      category_code: categoryCode,
    });
  };

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
          <Grid item key={category?.code} xs={12}>
            <Typography>{category?.title}</Typography>
          </Grid>

          <Grid container item key={category?.code + "sd"}>
            {(category?.data?.length || 0) > 0 &&
              category?.data.map(
                (mdCategory: MiddleCategoryInterface, mdIndex: number) => (
                  <React.Fragment key={mdCategory?.code}>
                    <Grid
                      item
                      container
                      key={mdCategory?.code}
                      xs={11.5 / (category.data.length || 1)}
                      justifyContent={"center"}
                      justifyItems={"center"}
                      textAlign={"center"}
                    >
                      <Button
                        onClick={() => {
                          handleCategoryClick(mdCategory.code);
                        }}
                      >
                        {mdCategory.title}
                      </Button>

                      <Grid
                        container
                        item
                        key={mdCategory?.code + "mm"}
                        xs={12}
                      >
                        {(category?.data?.length || 0) > 0 &&
                          mdCategory?.data?.map(
                            (
                              smCategory: SmallCategoryInterface,
                              smIndex: number
                            ) => (
                              <Grid
                                item
                                xs={12}
                                key={smCategory?.code + smIndex}
                              >
                                <Button
                                  onClick={() =>
                                    handleCategoryClick(smCategory.code)
                                  }
                                >
                                  {smCategory.title}
                                </Button>
                              </Grid>
                            )
                          )}
                      </Grid>
                    </Grid>
                    {category.data.length - 1 !== mdIndex && (
                      <ListDivider sx={{ margin: 0, padding: 0 }} />
                    )}
                  </React.Fragment>
                )
              )}
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default CategoryNavbarPopover;
