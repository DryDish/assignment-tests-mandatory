-- DB creation script 2/3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Stored procedures
DELIMITER $$
DROP PROCEDURE IF EXISTS `RemoveDuplicates`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RemoveDuplicates` ()  BEGIN
	DECLARE vcPostalCode CHAR(4);
	DECLARE vbFinished INTEGER DEFAULT 0;
    DECLARE curPostalCodes CURSOR FOR 
    	SELECT cPostalCode 
        FROM postal_code
        GROUP BY cPostalCode 
        	HAVING COUNT(*) > 1;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET vbFinished = TRUE;

	OPEN curPostalCodes;
    
    loop_pc: LOOP
    	FETCH curPostalCodes INTO vcPostalCode;
        IF vbFinished THEN
        	LEAVE loop_pc;
        END IF;
        DELETE FROM postal_code WHERE cPostalCode = vcPostalCode LIMIT 1;
    END LOOP loop_pc;
    
    CLOSE curPostalCodes;
END$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
