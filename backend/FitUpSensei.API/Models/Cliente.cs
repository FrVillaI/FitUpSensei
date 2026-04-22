using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("clientes")]
public class Cliente
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("edad")]
    public int? Edad { get; set; }

    [Column("peso_kg")]
    public decimal? PesoKg { get; set; }

    [Column("estatura_cm")]
    public decimal? EsaturaCm { get; set; }

    [Column("imc")]
    public decimal? Imc { get; set; }

    [Column("objetivo")]
    public string? Objetivo { get; set; }

    [Column("enfermedades")]
    public string? Enfermedades { get; set; }

    [Column("lesiones")]
    public string? Lesiones { get; set; }

    [Column("condiciones_especiales")]
    public string? CondicionesEspeciales { get; set; }

    [Column("horas_sueno_promedio")]
    public decimal? HorasSuenoPromedio { get; set; }

    [Column("consume_alcohol")]
    public bool? ConsumeAlcohol { get; set; }

    [Column("consume_tabaco")]
    public bool? ConsumeTabaco { get; set; }

    [Column("fc_reposo")]
    public int? FcReposo { get; set; }

    [Column("presion_arterial")]
    public string? PresionArterial { get; set; }

    [Column("coach_id")]
    public Guid? CoachId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
