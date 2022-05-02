import React from "react";

import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";

const FooterSection = ({ ultimateData }) => {
  //FOOTER

  const formatCurrency = (value) => {
    return value.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR"
    });
  };

  const quotationTotal = () => {
    let total = 0;

    for (let item of ultimateData()) {
      /* console.log(typeof item.quotation); */
      if (item.quotation) {
        total += Number(item.quotation);
      }
    }
    return formatCurrency(total);
  };

  const orderCostTotal = () => {
    let total = 0;

    for (let item of ultimateData()) {
      /* console.log(typeof item.orderCost); */
      if (item.orderCost) {
        total += Number(item.orderCost);
      }
    }
    return formatCurrency(total);
  };

  const finalCostTotal = () => {
    let total = 0;

    for (let item of ultimateData()) {
      /*  console.log(typeof item.finalCost); */
      if (item.finalCost) {
        total += Number(item.finalCost);
      }
    }
    return formatCurrency(total);
  };
  return (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={19}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={quotationTotal} />
        <Column footer={orderCostTotal} />
        <Column footer={finalCostTotal} />
      </Row>
    </ColumnGroup>
  );
};

export default FooterSection;
