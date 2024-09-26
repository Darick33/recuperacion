
TODO: Base de datos
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Sexto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Sexto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Sexto` DEFAULT CHARACTER SET utf8 ;
USE `Sexto` ;

-- -----------------------------------------------------
-- Table `Sexto`.`Proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Proveedores` (
  `idProveedores` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Empresa` VARCHAR(45) NOT NULL,
  `Direccion` TEXT NULL,
  `Telefono` VARCHAR(17) NOT NULL,
  `Contacto_Empresa` VARCHAR(45) NOT NULL COMMENT 'Campo para almacenar el nombre del empleado de la empresa para contactarse',
  `Teleofno_Contacto` VARCHAR(17) NOT NULL COMMENT 'Campo para almacenar el numero de telefono del coantacto de la emprsa',
  PRIMARY KEY (`idProveedores`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `Codigo_Barras` TEXT NULL,
  `Nombre_Producto` TEXT NOT NULL,
  `Graba_IVA` INT NOT NULL COMMENT 'Campo para almacenar si el producto graba IVA o no\n1 = Graba IVA\n0 = No posee IVA',
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Unidad_Medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Unidad_Medida` (
  `idUnidad_Medida` INT NOT NULL AUTO_INCREMENT,
  `Detalle` TEXT NULL,
  `Tipo` INT NULL COMMENT '1 = Unidad de Medida Ej: Gramos, Litros, Kilos\n0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack\n2 = Factor de Conversion Ej: Kilos a libras',
  PRIMARY KEY (`idUnidad_Medida`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`IVA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`IVA` (
  `idIVA` INT NOT NULL AUTO_INCREMENT,
  `Detalle` VARCHAR(45) NOT NULL COMMENT '8%\n12%\n15%',
  `Estado` INT NOT NULL COMMENT '1 = activo\n0 = inactivo',
  `Valor` INT NULL COMMENT 'Campo para almacenar el valor en entero para realizar calculos',
  PRIMARY KEY (`idIVA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Kardex`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Kardex` (
  `idKardex` INT NOT NULL AUTO_INCREMENT,
  `Estado` INT NOT NULL COMMENT 'Campo para almacenar el estado del kardex\n1 = activo\n0 = inactivo',
  `Fecha_Transaccion` DATETIME NOT NULL,
  `Cantidad` VARCHAR(45) NOT NULL,
  `Valor_Compra` DECIMAL NOT NULL,
  `Valor_Venta` DECIMAL NOT NULL,
  `Unidad_Medida_idUnidad_Medida` INT NOT NULL,
  `Unidad_Medida_idUnidad_Medida1` INT NOT NULL,
  `Unidad_Medida_idUnidad_Medida2` INT NOT NULL,
  `Valor_Ganacia` DECIMAL NULL,
  `IVA` INT NOT NULL,
  `IVA_idIVA` INT NOT NULL,
  `Proveedores_idProveedores` INT NOT NULL,
  `Productos_idProductos` INT NOT NULL,
  `Tipo_Transaccion` INT NOT NULL COMMENT '1= entrada Ej: Compra\n0 = salida  Ej: Venta',
  PRIMARY KEY (`idKardex`),
  INDEX `fk_Kardex_Unidad_Medida_idx` (`Unidad_Medida_idUnidad_Medida` ASC) ,
  INDEX `fk_Kardex_Unidad_Medida1_idx` (`Unidad_Medida_idUnidad_Medida1` ASC) ,
  INDEX `fk_Kardex_Unidad_Medida2_idx` (`Unidad_Medida_idUnidad_Medida2` ASC) ,
  INDEX `fk_Kardex_IVA1_idx` (`IVA_idIVA` ASC) ,
  INDEX `fk_Kardex_Proveedores1_idx` (`Proveedores_idProveedores` ASC) ,
  INDEX `fk_Kardex_Productos1_idx` (`Productos_idProductos` ASC) ,
  CONSTRAINT `fk_Kardex_Unidad_Medida`
    FOREIGN KEY (`Unidad_Medida_idUnidad_Medida`)
    REFERENCES `Sexto`.`Unidad_Medida` (`idUnidad_Medida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Kardex_Unidad_Medida1`
    FOREIGN KEY (`Unidad_Medida_idUnidad_Medida1`)
    REFERENCES `Sexto`.`Unidad_Medida` (`idUnidad_Medida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Kardex_Unidad_Medida2`
    FOREIGN KEY (`Unidad_Medida_idUnidad_Medida2`)
    REFERENCES `Sexto`.`Unidad_Medida` (`idUnidad_Medida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Kardex_IVA1`
    FOREIGN KEY (`IVA_idIVA`)
    REFERENCES `Sexto`.`IVA` (`idIVA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Kardex_Proveedores1`
    FOREIGN KEY (`Proveedores_idProveedores`)
    REFERENCES `Sexto`.`Proveedores` (`idProveedores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Kardex_Productos1`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `Sexto`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Clientes` (
  `idClientes` INT NOT NULL AUTO_INCREMENT,
  `Nombres` TEXT NOT NULL,
  `Direccion` TEXT NOT NULL,
  `Telefono` VARCHAR(45) NOT NULL,
  `Cedula` VARCHAR(13) NOT NULL,
  `Correo` TEXT NOT NULL,
  PRIMARY KEY (`idClientes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Factura` (
  `idFactura` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATETIME NOT NULL,
  `Sub_total` DECIMAL NOT NULL,
  `Sub_total_iva` DECIMAL NOT NULL,
  `Valor_IVA` DECIMAL NOT NULL,
  `Clientes_idClientes` INT NOT NULL,
  PRIMARY KEY (`idFactura`),
  INDEX `fk_Factura_Clientes1_idx` (`Clientes_idClientes` ASC) ,
  CONSTRAINT `fk_Factura_Clientes1`
    FOREIGN KEY (`Clientes_idClientes`)
    REFERENCES `Sexto`.`Clientes` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sexto`.`Detalle_Factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sexto`.`Detalle_Factura` (
  `idDetalle_Factura` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` VARCHAR(45) NOT NULL,
  `Factura_idFactura` INT NOT NULL,
  `Kardex_idKardex` INT NOT NULL,
  `Precio_Unitario` DECIMAL NOT NULL,
  `Sub_Total_item` DECIMAL NOT NULL,
  PRIMARY KEY (`idDetalle_Factura`),
  INDEX `fk_Detalle_Factura_Factura1_idx` (`Factura_idFactura` ASC) ,
  INDEX `fk_Detalle_Factura_Kardex1_idx` (`Kardex_idKardex` ASC) ,
  CONSTRAINT `fk_Detalle_Factura_Factura1`
    FOREIGN KEY (`Factura_idFactura`)
    REFERENCES `Sexto`.`Factura` (`idFactura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Detalle_Factura_Kardex1`
    FOREIGN KEY (`Kardex_idKardex`)
    REFERENCES `Sexto`.`Kardex` (`idKardex`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Detalle` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Usuario` VARCHAR(45) NOT NULL,
  `Contrasenia` VARCHAR(45) NOT NULL,
  `Estado` INT NOT NULL,
  `Usuarioscol` VARCHAR(45) NULL,
  `Roles_idRoles` INT NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `fk_Usuarios_Roles_idx` (`Roles_idRoles` ASC) ,
  CONSTRAINT `fk_Usuarios_Roles`
    FOREIGN KEY (`Roles_idRoles`)
    REFERENCES `Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
